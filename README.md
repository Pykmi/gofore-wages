# Monthly Wage Calculation System
## Usage
Use the following commands to clone the repository and install dependencies.

> *git clone https://github.com/Pykmi/gofore-wages.git*
> *cd gofore-wages && npm install*  

To display the usage guide, use this command.

> *node index.js -f files/hour-list.csv*  

## Assignment
Read and parse wage CSV files. Calculate monthly wage for every person based on the given calculation guidelines.

## Analysis & Planning
The specific set of tools and languages was not specified, so my first decision was that I would use *Node.js* and *JavaScript* for this application. My second decision was to make this a CLI application and that further influenced my decision to pick *Node.js,* as from experience I knew there would be a richer selection of ready tools for terminal and CLI applications, than for example if I had instead decided to use *Go.*

I did consider different options, such as a React application, which would have given me the opportunity to create a more interesting UI. However, this would have been beyond the scope of the assignment by a significant margin, draining more time for UI design and I wanted to stick mainly to writing programming logic.

## Problem
The primary problem are how normal working hours are differentiated from hours worked in the evening (from 19:00 to 06:00) and overtime. To further complicate things, there is overlap between overtime and evening hours, the latter which is not paid if the same hour is considered overtime.

The rest of the application is relatively standard; reading data from a CSV file and displaying the results from the processed data.

## Solution
I found a convenient solution with the [moment-range](https://github.com/rotaready/moment-range) package, which allowed me to create a time range, across hours and even days, and compare if there was overlap. This made it possible to separate when evening bonus would apply and when to only count the hours as part of normal working hours, without writing complicated hierarchy of IFs and Switches.

## Application Structure
The application can be separated into a few simple parts.

### Start Up
The application start deals with reading cli arguments and opening the CSV file for reading. There are a couple of very standard packages that I used for this purpose; [command-line-args](https://www.npmjs.com/package/command-line-args) and [command-line-usage.](https://github.com/75lb/command-line-usage) Both which simplified the process considerably.

### Reading & Processing
I wanted to avoid reading the data multiple times. E.g. first converting the data into a structure that was more convenient to iterate and then processing it. I used the [Readline Node.js](https://nodejs.org/api/readline.html) module to read the CSV file line by line and at the same time process the timecard data, collating them per user.

### Displaying & Final Calculations
Once the data has all been collected, the *store* is passed to the function that does the final calculations and displays the results. This is triggered by Readline’s *close* event, signalling that the reader has reached the end of the file.

The data is displayed by the cli-table package, which specializes in creating convenient tables into terminal environments.

## Improvements
I am pleased with the way the application turned out but there is a lot of room for improvement. The obvious that stands out is **more unit tests.** The tests themselves could be improved. There are also a lot of features that could be added.

The data itself could be analysed further and a **command prompt,** with more available commands, instead of just reading cli arguments on start up. Also more options could be added, such as **changing currencies** and features to **output** the results onto pdf & excel formats.

The reader itself should be tested to make sure it **performs** with larger data loads, with a **loading spinner** if longer loading times are required.