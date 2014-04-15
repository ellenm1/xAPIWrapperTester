if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} }; 
var testing = true; //turn to true to show debugging information for this script

 

var conf = {
  "endpoint" : "https://cloud.scorm.com/ScormEngineInterface/TCAPI/public/",
 
};


 
var adl = ADL.XAPIWrapper;
adl.debugLevel = "info";
var myactivity = "http://mlearning.med.umich.edu/ct2/cbtlib/modules/test/tincan/adl/bootstrap_adl/";
var myactid = "http://example.com/activity/courses/xapi";
var myagent = {"mbox" : "mailto:tester@example.com","name":"Joe Tester","objectType": "Agent"};
var xapiMasteryScore = '80';

var myprofile = {
    "umid": "123456799",
    "roles": [
        "Nurse",
        "isORstaff",
        "patientCareArea",
        "centralLineProc",
        "isResearcher"
    ]
}
 
 
//https://npmjs.org/package/adl-xapiwrapper


//ADL.XAPIWrapper.changeConfig(conf);
adl.changeConfig(conf);
