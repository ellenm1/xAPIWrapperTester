xAPIWrapperTester
=================

A form I'm using to test all the xAPI calls needed for our learning modules. Depends on the ADL xAPI Wrapper.
UNDER ACTIVE DEVELOPMENT. 

1. Edit config.js to point to the desired LRS
Directions for editing config.js:
https://github.com/adlnet/xAPIWrapper#configuration

What this does:

1. Generates fairly complex statements, including Interactions, Results, etc. More coming soon.
2. Sends statements to an LRS
3. Sends and Gets State
4. demonstrates getting very specific pieces of the State dataset
5. Sends Agent Profiles.

Try the demo here:
http://thedesignspace.net/misc/xapi/

 
##ToDo:
* add detailed step by step guide as you move thru the form
* add references to validator and jslint and other resources
* add guidance to determine what types of statements to write
* make duration field figure out the correct formatting 
* context section -started
* validation - started
* change statement fields should look up and offer a selection of relevant statements to choose from
* getAgent profile form
