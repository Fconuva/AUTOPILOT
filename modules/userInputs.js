const prompts = require('prompts');

// Asks user for a task
async function getTaskInput() {
    const response = await prompts({
       type: 'text',
       name: 'task',
       message: 'Please enter your TASK (multiline supported):',
       multiline: true,
         validate: value => value.length > 0 ? true : 'Please enter a task'
     });

    return response.task;
}

module.exports= {
    getTaskInput
}