var inquirer = require('inquirer');
var fs = require('fs');

var changeCase = require('change-case');
var containersPath = './src/containers/';

function validateName (name, callback) {
    if (!name) {
        callback(new Error('Name must be defined'));

        return false;
    }

    if (!changeCase.isUpperCase(name.slice(0, 1))) {
        callback(new Error('Name must be CamelCased'));

        return false;
    }

    fs.readdir(containersPath, function (error, files) {
        if (error) {
            throw error;
        }

        var fileAlreadyExists = files.some(function (fileName) {
            return fileName === name;
        });

        if (fileAlreadyExists) {
            callback(new Error(name + ' already exists: ' + containersPath + name));

            return false;
        }

        return callback(void 0, name);
    });
}

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Container name',
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
        message: 'Container description',
        validate: function (description) {
            return !!description;
        }
    }
], function (answers) {
    var containerName = answers.name;

    if (containerName.indexOf('Container') === -1) {
        containerName = containerName + 'Container';
    } else {
        containerName = answers.name.slice(0, containerName.indexOf('Container'));
    }

    var scaffoldPath = containersPath + '__SCAFFOLD__/';

    fs.readdir(scaffoldPath, function (error, files) {
        files.forEach(function (file) {

            fs.readFile(scaffoldPath + file, 'utf8', function (err, data) {
                if (err) {
                    throw err;
                }

                var newComponentDirectory = containersPath + containerName + "/";
                fs.mkdir(newComponentDirectory, function () {
                    file = file.replace(/__CONTAINER_NAME__/g, containerName);

                    data = data
                        .replace(/__CONTAINER_NAME__/g, containerName)
                        .replace(/__CONTAINER_NAME__/g, containerName)
                        .replace(/__NAME-PARAMCASE__/g, changeCase.paramCase(containerName))
                        .replace(/__NAME-CAMELCASE__/g, changeCase.camelCase(containerName))
                        .replace(/__DESCRIPTION__/g, answers.description);

                    fs.writeFile(newComponentDirectory + file, data, 'utf8', function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                });

            });

        });

        console.log('New Container: ' + containersPath + ' ' + containerName);
    });

});
