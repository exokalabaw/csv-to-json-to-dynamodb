import base from './base.js';
import tables from './tables.js';
import fs from 'fs';
import { v4 } from "uuid";




const whatToParse = "instrument"
const baseObject = eval(`base.${whatToParse}`)
const dbLength = Math.ceil(baseObject.length / 25)
/*console.log('base length is : ' + base.length + ' divisor is :  ' + dbLength)*/


async function loopdie(){
  try{
    const result = tables.find(({Category}) => Category === whatToParse)
    const tableName = result.Table
    console.log('table name : ' + tableName)
    let count = 1
    while (count <= dbLength){
      let currentMax = count*25
      let currentMin = ((count - 1) * 25)+1
      let returned = []
      let i = null;
      let capped = whatToParse.charAt(0).toUpperCase() + whatToParse.slice(1);
      console.log('capped is : ' + capped )
        baseObject.map(function(element, index){
            
            const defaultTerm = `default${capped}Term`
            if ((index + 1 >= currentMin) && (index + 1 <= currentMax)) {
              let el = `element.${capped}`
              let item = {
                PutRequest: {
                  Item: {
                    [defaultTerm]: { S:  eval(el)},
                    id: {S: v4()}
                  }
                }
              };
              returned.push(item);
              i = index;
            }
          })
        const finalized = `{"${tableName}":${JSON.stringify([...returned])}}`
        const parsed = JSON.stringify(finalized)
        fs.writeFileSync(`jsonfiles/${whatToParse +'s' + count}.json`,finalized)

        exec(`aws dynamodb batch-write-item --request-items file://jsonfiles/${whatToParse+'s' + count}.json`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
      });
        console.log('current min is : ' + currentMin + ' current max is : ' + currentMax + ' index is : ' + i)
      count ++
    }
  }catch(err){
    console.log('error in the loop : ' + err)
  }
  
}
loopdie()


