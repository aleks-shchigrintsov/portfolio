var inquirer = require('inquirer');
var fs = require('fs');

var changeCase = require('change-case');
var componentPath = './src/components/';

function validateName (name, callback) {
    if (!name) {
        callback(new Error('Name must be defined'));

        return false;
    }

    if (!changeCase.isUpperCase(name.slice(0, 1))) {
        callback(new Error('Name must be CamelCased'));

        return false;
    }

    fs.readdir(componentPath, function (error, files) {
        if (error) {
            throw error;
        }

        var fileAlreadyExists = files.some(function (fileName) {
            return fileName === name;
        });

        if (fileAlreadyExists) {
            callback(new Error(name + ' already exists: ' + componentPath + name));

            return false;
        }

        return callback(void 0, name);
    });
}

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Component name',
        validate: function (name) {
            var done = this.async();

            validateName(name, function (error, name) {
                if (name) {
                    return done(true);
                } else {
                    return done(error.message);
                }
            });
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Component description',
        validate: function (description) {
            return !!description;
        }
    }
], function (answers) {
    var componentName = answers.name;

    if (componentName.indexOf('Component') === -1) {
        componentName = componentName + 'Component';
    }

    var componentPath = './src/components/';
    var scaffoldPath = componentPath + '__SCAFFOLD__/';

    fs.readdir(scaffoldPath, function (error, files) {
        files.forEach(function (file) {

            fs.readFile(scaffoldPath + file, 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }

                var newComponentDirectory = componentPath + componentName + "/";
                fs.mkdir(newComponentDirectory, function () {
                    file = file.replace(/__NAME__/g, componentName);

                    data = data
                        .replace(/__NAME__/g, componentName)
                        .replace(/__NAME-PARAMCASE__/g, changeCase.paramCase(componentName))
                        .replace(/__NAME-CAMELCASE__/g, changeCase.camelCase(componentName))
                        .replace(/__DESCRIPTION__/g, answers.description);

                    fs.writeFile(newComponentDirectory + file, data, 'utf8', function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                });

            });

        });
    });

});
