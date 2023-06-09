const { callAgent } = require('../agents/genericAgent');
const { jsonParseWithValidate } = require('../modules/jsonHelpers');

const promptTemplate =
` 
USER INPUT: {task}
YOUR TASK: Find and extract the relevant source code on this file to solve the USER INPUT. Don't modify the code. Extract only if the code is relevant, otherwise ignore.
RESPONSE FORMAT: This is the format of your reply. Ensure the response can be parsed by JSON.parse. Must be valid JSON
{{
    "thoughts":
    {{
        "text": "thought",
        "reasoning": "reasoning",
        "criticism": "constructive self-criticism",
        "speak": "thoughts summary to say to user"
    }},
    "output": {{
        "relevantCode": [{{
            "sourceCode": "extract code from the file in string format",
            "reason": "reason this code was selected"
        }}]
    }}
}}
CONTEXT SOURCE CODE: 
*** CONTEXT SOURCE CODE START ***
// {filePath}
{fileCode}
*** CONTEXT SOURCE CODE END ***

`

async function getRelevantContextForFile(task, file) {
    const values = {task:task, fileCode:file.code, filePath: file.path}
    const reply = await callAgent(promptTemplate, values, process.env.CHEAP_MODEL);
    return jsonParseWithValidate(reply);
  }

module.exports = getRelevantContextForFile