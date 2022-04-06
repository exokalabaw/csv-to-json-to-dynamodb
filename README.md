# csv-to-json-to-dynamodb

I sourced someone to compile a list of data that I needed for the kindreds app. The data was submitted in a google spread sheet. I needed to 

1. Convert an extracted CSV from the sheet to JSON so that I could . (csvtojson.js)
2. Do an automated upload of the data into an Amazon Dynamodb table. (index.js)

* Dynamodb data could be uploaded through shell but the limitation was 25 items per go. This index script takes the main converted JSON file and divides it into batches of 25 item JSON files. The same script automates the CLI command via exec and uploads the data the said batches.
