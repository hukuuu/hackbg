var fs = require('fs'),
    eolWindows = require('os').EOL,
    url = require('url'),
    http = require('http'),
    https = require('https'),
    input = process.argv[2],
    ArgumentParser = require('./node_modules/argparse').ArgumentParser;

var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Simple json-ini file parser'
});
parser.addArgument(
    ['--type'], {
        help: 'the file of the input file'
    }
);
parser.addArgument(
    ['input'], {
        help: 'input file'
    }
);
var args = parser.parseArgs();
input = args.input;
inputType = args.type;
if (inputType)
    input += '.' + inputType

doIt(input);


function doIt(string) {
    var contents,
        parsed,
        resultFileName,
        eol,
        parse;

    resultFileName = url.parse(string).protocol === null ?
        switchExtension(string) :
        switchExtension(extractFileNameFromUrl(string))

    parse = makeParser(resultFileName.substring(resultFileName.indexOf('.')))


    var possibleUrl = url.parse(string)

    if (possibleUrl.protocol === null) {
        eol = eolWindows;
        parsed = parse(fs.readFileSync(input, 'utf8'), eol)
        fs.writeFile(resultFileName, parsed)

    } else if (possibleUrl.protocol === 'http:') {
        eol = '\n';
        http.get(input, function(res) {
            acumulateContent(res, function(data) {
                parsed = parse(data, eol)
                var fn = extractFileNameFromUrl(input)
                fs.writeFile(resultFileName, parsed)
            })
        })

    } else if (possibleUrl.protocol === 'https:') {
        eol = '\n';
        https.get(input, function(res) {
            acumulateContent(res, function(data) {
                parsed = parse(data, eol)
                var fn = extractFileNameFromUrl(input)
                fs.writeFile(resultFileName, parsed)
            })
        })
    }

}

function switchExtension(file) {
    if (file.indexOf('.json') > -1) {
        return file.replace(/.json$/, '.ini')
    } else if (file.indexOf('.ini') > -1) {
        return file.replace(/.ini$/, '.json')
    } else {
        return file + '.ini'
    }
}

function extractFileNameFromUrl(url) {
    return url.substring(url.lastIndexOf('/') + 1)
}

function acumulateContent(res, cb) {
    var data;
    res.on('data', function(d) {
        data = d.toString();
    })
    res.on('end', function() {
        cb(data)
    })
}

function makeParser(type) {
    if (type === '.ini')
        return parseJson
    return parseIni
}

function parseIni(string, eol) {
    var obj = {},
        section,
        key,
        value,
        lines;

    lines = string.split(eol)
    lines.forEach(function(line) {
        var trimmed = line.trim()
        if (isComment(line))
            return;
        if (isSection(trimmed)) {
            section = extractSection(trimmed)
        }
        if (isKey(trimmed)) {
            key = extractKey(trimmed)
            value = extractValue(trimmed)
            obj[section] = obj[section] || {}
            obj[section][key] = value
        }
    });
    return JSON.stringify(obj, null, 4)
}

function parseJson(string, eol) {
    var obj = JSON.parse(string),
        contents = ''
    for (var section in obj) {
        contents += makeSection(section) + eol
        for (var key in obj[section]) {
            contents += makeKeyValue(key, obj[section][key]) + eol
        }
    }
    return contents
}

function makeSection(section) {
    return '[' + section + ']'
}

function makeKeyValue(key, val) {
    return '    ' + key + '=' + val
}


function extractValue(line) {
    return line.substring(line.indexOf('=') + 1).trim()
}

function extractKey(line) {
    return line.substring(0, line.indexOf('=')).trim()
}

function extractSection(line) {
    return line.substring(1, line.length - 1).trim()
}

function isSection(line) {
    return line[0] === '[' && line[line.length - 1] === ']'
}

function isKey(line) {
    return line.indexOf('=') > -1;
}

function isComment(line) {
    return line[0] === ';'
}
