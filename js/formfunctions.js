 //todo 
 //add detailed step by step guide as you move thru the form
 //x-add references to validator and other resources
 	//http://zackpierce.github.io/xAPI-Validator-JS/
 //add pre-form guidance to determine what types of statements to write
 //make duration field figure out the correct formatting 
 //X-context section
  //X-validation
  //change statement fields to look up relevant statements so you can select them
 //get piece of Agent profile form


 var teststmt = {"actor" : {"mbox" : "mailto:tom@example.com","name":"Tom XAPIWrapperTester","objectType": "Agent"},
            "verb"  : {"id" : "http://adlnet.gov/expapi/verbs/attempted",
                       "display" : {"en-US" : "attempted"}},
            "object":{"id" : "http://adlnet.gov/expapi/activities/module/","objectType": "Activity"}};
            
    var choiceCount = 2;		
    	var scaleCount = 2;
    	var sourceCount = 2;//used for both source and target
    	var stepCount = 2;
    var isInteractionActivity =false;

	$( document ).ready(function( ) {
		var adl = ADL.XAPIWrapper;
		adl.changeConfig(conf);
		adl.debugLevel = "info";
		//http://stackoverflow.com/questions/1414276/how-to-make-first-option-of-select-selected-with-jquery
		// mark the first option as selected
		$("select").val("");
		$("objecttype").val("");
		//$("#form1").validationEngine();
		$("#endpoint").html(conf.endpoint); 
   		//$("#sendstatementBtn1").click( function(){ sendStatement( unescape( $('#statement').html() ) ); });
   		//$("#sendstatementBtn1").click( function(){ sendStatement( $.parseJSON( unescape( $('#statement').html() ) ) ); });
   		$("#sendStatementBtn0").click( function(){ sendStatement( $.parseJSON( unescape(cleanTextArea(document.forms[0].statement) ) ) ) } );//textarea output has to be cleaned up before sending or you get JSON errors
   		$("#sendStatementBtn1").click( function(){ sendStatement(teststmt) });
   		$("#sendStateBtn").click(     function(){ sendState('modulestate', $('#stateval').val() )  })
    	$("#getStateBtn").click(      function(){ getState($('#stateid').val() ) });
    	$("#getpaStateBtn").click(      function(){  getValuesFromState('pa')});
    	$("#getmvStateBtn").click(      function(){ getValuesFromState('mv')  }); 
    	$("#sendStatementBtn2").click( function(){ setStatementParams()} ); 
    	$("#sendStatementBtn3").click( function(){ setStatementParams()} );
    	$("#sendStatementBtn4").click( function(){ setStatementParams()} );
    	$("#sendStatementBtn5").click( function(){ setStatementParams()} );
    	$("#sendStatementBtn6").click( function(){ setStatementParams()} );
    	//toggle link functions to open/close boxes that arent needed at the moment
    	$("#sendProfileBtn1").click( function(){ sendAgentProfile();  }); 
    	$("#resultToggle").click(function(){$("#SG_resultinputs").toggle();  });
    	$("#contextToggle").click(function(){$("#SG_contextinputs").toggle();  });
    	$("#showCorrectResponsePatternEx").click(function(){$('#correctRespPatternExamples').toggle(); });
    	$("#sendStatementToggle").click(function(){scrollTo("sendstatementfreetext");$("#sendStatementInputs").toggle();  }); 
    	$("#sendStateToggle").click(function(){$("#sendStateInputs").toggle();  }); 
    	//$("#sendStateToggle").click(function(){$("#sendStateInputs").toggle();  }); 
    	$("#getStateToggle").click(function(){$("#getStateInputs").toggle();scrollTo("getstate");  }); 
    	$("#getModuleSpecificToggle").click(function(){$("#getModuleSpecificInputs").toggle();scrollTo("getmodspec");    }); 		
    	$("#statementGeneratorToggle").click(function(){$("#statementGeneratorInputs").toggle(); scrollTo("top");   });
    	$("#sendAgentProfileToggle").click(function(){$("#sendAgentProfileInputs").toggle();scrollTo("sendagentp");    });
    	$("#exampleClose").click(function(){ $("#correctRespPatternExamples").hide(); }); 
    	$("#objecttype").change(function(){scrollTo("obj")});
    	$("#addChoice").click(function(){ $("#actDef_comp_choice").addForms("choice"); });
    	$("#addScale").click(function(){  $("#actDef_comp_scale").addForms("scale"); });
    	$("#addMatch").click(function(){
    			$("#actDef_comp_source").addForms("source"); 
    			$("#actDef_comp_target").addForms("target");
    	});
    	$("#addStep").click(function(){ $("#actDef_comp_step").addForms("step"); });
    	
    	$("#actDef_interactionType").change(function(){
    		scrollTo('intprop');
    		switch( $("#actDef_interactionType").val() ){
			case "choice":
			$("div[id^=actDef_comp_]").hide();
			$("#intComponents").show();
			$("#actDef_comp_choice").show();
			break;
			case "likert":
			$("div[id^=actDef_comp_]").hide();
			$("#intComponents").show();
			$("#actDef_comp_scale").show();
			break;
			case "matching":
				$("div[id^=actDef_comp_]").hide();
				$("#intComponents").show();
				$("#actDef_comp_source").show();
				$("#actDef_comp_target").show();
			break;
			case "performance":
				$("div[id^=actDef_comp_]").hide();
				$("#intComponents").show();
				$("#actDef_comp_steps").show();
			break;
			default:
				$("#intComponents").hide();
			}
    	
    	})
    	
	 			
		
    	 
    	$.fn.addForms = function(f){
    	  	
    	  	choiceCount =(choiceCount<10)? '0'+(choiceCount):choiceCount;
    		scaleCount  =(scaleCount<10) ? '0'+scaleCount : scaleCount;
    		sourceCountPadded =(sourceCount<10) ? '0'+sourceCount : sourceCount;
    		targetCount =(sourceCount<10) ? '0'+sourceCount : sourceCount;
    		stepCount   =(stepCount<10) ? '0'+stepCount : stepCount;	 
    		
    		
    		var choiceForm ="<div id='actDef_compChoice"+choiceCount+"'>"+
							"<label>Choice ID "+choiceCount+
							"<input id='actDef_compChoiceID"+choiceCount+"' type='text'></label>"+
							"<label>choice Description "+choiceCount+" <span class='optional'>(English only)</span>"+
							"<input id='actDef_compChoiceDesc"+choiceCount+"' type='text'>"+
							"</label>"+					
							"</div>";
    		var scaleForm ="<div id='actDef_compScale"+scaleCount+"'>"+
							"<label>Scale ID "+scaleCount+
							"<input id='actDef_compScaleID"+scaleCount+"' type='text'></label>"+
							"<label>Scale Description "+scaleCount+" <span class='optional'>(English only)</span>"+
							"<input id='actDef_compScaleDesc"+scaleCount+"' type='text'>"+
							"</label>"+					
							"</div>";
    		var sourceForm="<div id='actDef_compSource"+sourceCountPadded+"'>"+
							"<label>Source ID "+sourceCountPadded+
							"<input id='actDef_compSourceID"+sourceCountPadded+"' type='text'></label>"+
							"<label>Source Description "+sourceCountPadded+" <span class='optional'>(English only)</span>"+
							"<input id='actDef_compSourceDesc"+sourceCountPadded+"' type='text'>"+
							"</label>"+					
							"</div>";
    		var targetForm = "<div id='actDef_compTarget"+targetCount +"'>"+ //target uses sourceCount also.
							"<label>Target ID "+targetCount +
							"<input id='actDef_compTargetID"+targetCount +"' type='text'></label>"+
							"<label>target Description "+targetCount +" <span class='optional'>(English only)</span>"+
							"<input id='actDef_compTargetDesc"+targetCount +"' type='text'>"+
							"</label>"+					
							"</div>";
    		var stepForm = "<div id='actDef_compStep"+stepCount+"'>"+
							"<label>Step ID "+stepCount+
							"<input id='actDef_compStepID"+stepCount+"' type='text'></label>"+
							"<label>Step Description "+stepCount+" <span class='optional'>(English only)</span>"+
							"<input id='actDef_compStepDesc"+stepCount+"' type='text'>"+
							"</label>"+					
							"</div>";
							
			
			switch(f){
			case "choice":
			$(this).append(choiceForm);
                    choiceCount++;
                    break;
			case "scale":
			 $(this).append(scaleForm);
                    scaleCount++;
                    break;
            case "source":
            $(this).append(sourceForm);
                    //sourceCount++;//this will be incremented in the target step below.
                    break;
             case "target":
            $(this).append(targetForm);
                    sourceCount++;
                    break;
            default:			 
    		}//end switch	
    	}//end addforms
    	
    	
 
    	
    	
    	$("#dataset").on("change", function (){
			 $("div.submenu").hide();
			 var targID  = $(this).val ();
			 if(typeof targID!="undefined"){
				var targID  = $(this).val ();
				$('#'+targID).show();
			 }	 
			$('#dataset').blur();
    	});  
    	$("#objecttype").on("change",function(){
    		scrollTo('obj');
    		 switch($("#objecttype").val()){
			case "activity":
				$(".objectproperties").hide();
			  	$("div#objectTypeActivity").show(); 
			  	isInteractionActivity =false; 
			  	break;
			case "agent":
			  	$(".objectproperties").hide();
			  	$("div#objectTypeAgent").show();
			  	break;
			case "group":
			  	$(".objectproperties").hide();
			  	$("div#objectTypeGroup").show();
			  	break;
			case "statementref":
			  	$(".objectproperties").hide();
			  	$("div#objectTypeStatementref").show();
			  	break;
			case "substatement":
			  	$(".objectproperties").hide();
			  	$("div#objectTypeSubstatement").show();
			  	break;
			default:
			 // $(".objectproperties").hide();
			  //	$("div#objectTypeActivity").show();  
			}//end switch

    		  		
    	});
    	$("#actDef_activitytype").on("change",function(){
    		scrollTo('acttype');
    		$("div#actDef_InteractionProperties").hide();
    		 isInteractionActivity = false;
    		 
    		 switch($("#actDef_activitytype").val()){
    		 case "http://adlnet.gov/expapi/activities/interaction":
    			$("div#actDef_InteractionProperties").show();
    			 isInteractionActivity = true;
    			break;
    			default:
    		}//end switch;
    		});  	
    	populateVerbOptions()
});//end ready function

	function scrollTo(anchor) {
    	location.hash = "#" + anchor;
	}

	function populateVerbOptions(){
		var verboptions='<select name = "verbselector" id="verbselector"  data-validation-engine="validate[required]">\n';
		verboptions+=('<option value="" selected>Select a verb...</option>');		
		$.each(ADL.verbs, function(key, val) {
		//	console.log('key='+key+' val='+val);
    	 	verboptions+=('<option value="' + val.id + '">' + val.display["en-US"] + '</option>\n'); 
  		});	
  		verboptions+=('</select>\n');
  		$("#adlverbs").html(verboptions);
	}//populateVerbOptions
	
 	function cleanTextArea(txt){
 	 	var text = txt.value;
		text = text.replace(/\r?\n/g, '');
	//	text = text.substring(1, text.length-1);
		return text;
		}
	
	function sendStatement(st){
		ADL.XAPIWrapper.sendStatement(st, function(resp, obj){ 
													var json_text = JSON.stringify(st, null, 2);
												$('#result').html(
													'<div class="box"><pre>'+
													'var params='+json_text+
													'sendStatement(params)</pre></div>'+
													 '<b>Statement:</b><br/>'+json_text + 

													'<br/><br/> st.actor='+ st.actor+'<br/>st.id='+st.id+'st.object'+st.object+'<br/>st.verb='+st.verb+'<br/><b style="color:red">Response:</b><br/>obj.id='+obj.id+'<br/>resp.response=' +resp.response) 
												}); 
	}	
	
	function sendState(id,val){
		ADL.XAPIWrapper.sendState("http://adlnet.gov/expapi/activities/module/", {"mbox" : "mailto:tom@example.com","name":"Ellen M","objectType": "Agent"}, id, null, val,'','',function(){ console.log('sendState Complete') });
	}
	 
	function getState(id){
		var respdata=	ADL.XAPIWrapper.getState("http://adlnet.gov/expapi/activities/module/",   {"mbox" : "mailto:tom@example.com","name":"Ellen M","objectType": "Agent"},  id,'','',
						function(resp, obj){ 
										console.log('getState Complete'); 
											$('#result').html( 'resp.response=' +resp.response) 
										}); 		 	 
		return respdata;
	}
			
	function getValuesFromState(set){
		if(set=='pa'){
		 				//var dataset='pageArray';
		 				var nn,pp;
						var itm =( $("#item").val() !="" ? $("#item").val():0 );
						var qq=($("#itemprop").val()!=""?$("#itemprop").val():null);
						var respdata=	ADL.XAPIWrapper.getState("http://adlnet.gov/expapi/activities/module/", {"mbox" : "mailto:tom@example.com","name":"Ellen M","objectType": "Agent"},  'modulestate','','', function(resp, obj){ 
											console.log('getState Complete'); 
											nn = JSON.parse(resp.response).pageArray[itm];
											pp = nn[qq];
											$('#result').html( 'pageArray['+itm+'].'+qq+'="' +pp +'"') 
										}); 
				}//end if
				
		else{		 
						//var dataset= 'modulevars';
						var itm=($("#modulevars").val()!=""?$("#modulevars").val():null);
					 	var respdata=	ADL.XAPIWrapper.getState("http://adlnet.gov/expapi/activities/module/", {"mbox" : "mailto:tom@example.com","name":"Ellen M","objectType": "Agent"},  'modulestate','','', function(resp, obj){ 
											console.log('getState Complete'); 
											nn = JSON.parse(resp.response).modulevars[itm];
											 
											$('#result').html( 'modulevars['+itm+']="' +nn+'"') 
										}); 	
		}
		
		 	 
		return respdata;
	}

	function setStatementParams(){
	/*
	//Statement generator params
	//need to decide where each value is going to come from: user input, launch string, LMS web services, etc. 	
	//agent must use 1 of these 4 inverse identifiers:
	//https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md#details-3
	//mbox	mailto IRI	The required format is "mailto:email address". 
	//	Only email addresses that have only ever been and will ever be assigned to this Agent, but no others, should be used for this property and mbox_sha1sum.
	//mbox_sha1sum	String	The SHA1 hash of a mailto IRI (i.e. the value of an mbox property). An LRS MAY include Agents with a matching hash when a request is based on an mbox.
	//openid	URI	An openID that uniquely identifies the Agent.
	//account	Object	A user account on an existing system e.g. an LMS or intranet.
	*/	
	var mailbox = ($('#mbox').val())?$('#mbox').val():'tester@example.com';
	var agentname = ($('#name').val())?$('#name').val():'Ellen M';
	var myagent = {"mbox" : "mailto:"+ mailbox,"name": agentname,"objectType": "Agent"};
	var vbselect = $("#verbselector");
	var vb = typeof $("#verbselector").val()!="undefined"?$("#verbselector").val():"http://adlnet.gov/expapi/verbs/experienced";
	console.log('vb='+vb);
	//define the skeleton of the statement
	var csParams = {actor:myagent, verb:{}, object:{}}
	//start filling it in with parameters for each piece	 
	csParams.verb.display = {},
	csParams.verb.id=vb,
	csParams.verb.display["en-US"]=$("option:selected", vbselect).text()!=""?$("option:selected", vbselect).text():"experienced";
	//http://stackoverflow.com/a/9138615
	switch( $("#objecttype").val() ){
		case "activity": 
				
				csParams.object.id=$("#activityid1").val(),
				csParams.object.objectType="Activity",
				csParams.object.definition = {},
				csParams.object.definition["name"]={},
				csParams.object.definition.description = {},
				csParams.object.definition["name"]["en-US"]=$("#actDef_Name").val(),	
				csParams.object.definition.description["en-US"]=$("#actDef_Description").val(),
				csParams.object.definition.type=$("#actDef_activitytype").val();
				csParams.object.definition.moreinfo=$("#actDef_moreInfo").val(); 
			  	if(isInteractionActivity){ 
			  		if($("#actDef_interactionType").val()!=""){csParams.object.definition.interactionType =  $("#actDef_interactionType").val();}
			  		if($("#actDef_intRespPattern").text()!=""){//I am assuming this is truly optional
			  		 	csParams.object.definition.correctResponsesPattern = $("#actDef_intRespPattern").text();
			  		}
			  		 
			  		 
			  		var map = {};
			  		if($("#actDef_interactionType").val()=="choice"){			  		   
			  		 	$.each( $(":input[id^=actDef_compChoiceID]"),function(k,v){
			  				var num = $(":input[id^=actDef_compChoiceID]").length;
			  				k = k+1; k=(k<10)? '0'+(k):k; 
			  				if(testing){console.log('zeropadded k ='+k);} 
			  				map[$("#actDef_compChoiceID"+k).val()] = $("#actDef_compChoiceDesc"+k).val(); 		 
			  		 	});//end $.each
			  		 		csParams.object.definition.choices = map;
			  		}//end if choice
			  		 	 
			  		if($("#actDef_interactionType").val()=="likert"){
			  		 	$.each( $(":input[id^=actDef_compScaleID]"),function(k,v){
			  				var num = $(":input[id^=actDefScaleID]").length;
			  				k = k+1;k=(k<10)? '0'+(k):k; 
			  				map[$("#actDef_compScaleID"+k).val()] = $("#actDef_compScaleDesc"+k).val(); 		 
			  		 	});//end $.each
			  		 		csParams.object.definition.scale =map;
			  		}//end if likert
			  		
			  		if($("#actDef_interactionType").val() == "matching"){
			  		var targetmap={}, sourcemap = {};
			  		 	$.each( $(":input[id^=actDef_compSourceID]"),function(k,v){
			  				var num = $(":input[id^=actDefSourceID]").length;
			  				k = k+1; k=(k<10)? '0'+(k):k; 
			  				if(testing){console.log('zeropadded k ='+k);} 
			  				console.log('k='+k+' $("#actDef_compSourceID"+k).val()='+$("#actDef_compSourceID"+k).val()+' $("#actDef_compSourceDesc"+k).val()='+$("#actDef_compSourceDesc"+k).val());
			  				console.log('k='+k+' $("#actDef_compTargetID"+k).val()='+$("#actDef_compTargetID"+k).val()+' $("#actDef_compTargetDesc"+k).val()='+$("#actDef_compTargetDesc"+k).val());
			  				sourcemap[$("#actDef_compSourceID"+k).val()] = $("#actDef_compSourceDesc"+k).val(); 
			  				targetmap[$("#actDef_compTargetID"+k).val()] = $("#actDef_compTargetDesc"+k).val(); 		 
			  		 	});//end $.each
			  		 		csParams.object.definition.source = sourcemap;
			  		 		csParams.object.definition.target = targetmap;
			  		 }//end if matching
			  		 
			  		 if($("#actDef_interactionType").val()=="steps"){
			  		 	$.each( $(":input[id^=actDef_compStepsID]"),function(k,v){
			  				var num = $(":input[id^=actDefStepsID]").length;
			  				k = k+1;k=(k<10)? '0'+(k):k; 
			  				map[$("#actDef_compStepsID"+k).val()] = $("#actDef_compStepsDesc"+k).val(); 		 
			  		 	});//end $.each
			  		 		csParams.object.definition.steps =map;
			  		}//end if likert	
			  		 if($("#actDef_interactionType").val()==""){csParams.object.definition.scale =[actDef_intRespPattern] }
			  		 if($("#actDef_interactionType").val()==""){csParams.object.definition.source = [actDef_intRespPattern]}
			  		 if($("#actDef_interactionType").val()==""){csParams.object.definition.target =[actDef_intRespPattern] }
			  		 if($("#actDef_interactionType").val()==""){csParams.object.definition.steps = [actDef_intRespPattern]}
			  	} 
			  	break;
		case "agent": 
			csParams.object.id=$("#objTypeAgentMbox").val(),
			csParams.object.objectType="Agent",
			csParams.object.definition = {},
			csParams.object.definition["name"]={},	
			csParams.object.definition["name"]["en-US"]=$("#objTypeAgentName").val();		
			break;
		case "group": 
			csParams.object.id=$("#objTypeGroupName").val(),
			csParams.object.objectType="Group",
			csParams.object.definition = {},
			csParams.object.definition["name"]={},	
			csParams.object.definition["name"]["en-US"]=$("#objTypeGroupName").val();
			var groupmemberlist=unescape(cleanTextArea(document.getElementById("groupmembers")) );
			csParams.object.member="["+groupmemberlist+"]";//array of agent objects
			break;
		case "statementref":
			csParams.object.id=$("#objTypeStRefID").val(),
			csParams.object.objectType="StatementRef";
			break; 
		//case "substatement":
		//not done yet
		//break; 
		default:
			csParams.object.id="http://yourserver.com/defaultactivity/",
			csParams.object.objectType="Activity",	
			csParams.object.definition = {},
			csParams.object.definition["name"]={},	
			csParams.object.definition.description = {},	
			csParams.object.definition["name"]["en-US"]="Default Activity Name",	
			csParams.object.definition.description["en-US"]="Default Activity Description";
	}//end switch

    //result area - all properties of result are optional, so if any of them are filled in, send a result.		  		
      	if($("input[id^=SG_result_]").val() !=""){
      		csParams.result = {};
      		
      		if($("#SG_result_success").val() !=""){
      			csParams.result.success = $("#SG_result_success").val();
      		}
      		if($("#SG_result_completion").val() !=""){
      			csParams.result.completion = $("#SG_result_completion").val();
      		}
      		//if any score inputs filled, put score object in.
      		 if($("input[id^=SG_result_score_]").val()!=""){
      			 csParams.result.score  = {};		 
      			 var minScoreVal =  parseInt($("#SG_result_minscore").val(),10);
      			 var maxScoreVal =  parseInt($("#SG_result_maxscore").val(),10);
      			 var rawScoreVal =  parseInt($("#SG_result_rawscore").val(),10);
      			 console.log('rawScoreVal = '+rawScoreVal+', maxScoreVal= '+maxScoreVal+', minScoreVal'+minScoreVal);
      			 }
      			 //if ALL score inputs filled, calculate scaled score
      		if(allScoreInputsFilled()){
      			//fill in scaled score automatically
      			if (parseFloat(maxScoreVal - minScoreVal) > 0){
      				csParams.result.score.scaled =  (parseFloat(rawScoreVal-minScoreVal))/(parseFloat(maxScoreVal - minScoreVal));
      				}
      			else {/*not sure what to do if invalid - probably just prevent it in the first place*/}	 
      		}	
      			
      		if($("#SG_result_rawscore").val() !=""){
      				csParams.result.score.raw  = $("#SG_result_rawscore").val();	
      		}
      		if($("#SG_result_score_minscore").val() !=""){
      				csParams.result.score.min  = $("#SG_result_rawscore").val();	
      		}
      		if($("#SG_result_rawscore").val() !=""){
      				csParams.result.score.max  = $("#SG_result_rawscore").val();	
      		}   		
      		if($("#SG_result_response").text() !=""){
      			csParams.result.response = $("#SG_result_response").text();
      		}
      		if($("#SG_result_duration").val() !=""){
      			csParams.result.duration = $("#SG_result_duration").val();
      		}
      		
      		//cmi.score.scaled = ((internal_raw - internal_min)/(internal_max - internal_min))
      	
      	
      	}	
   	//context area - all properties of context are optional, so if any of the are filled in, send a context.   	
      $.each($("input[id^=SG_context_]"),function(){
      	var hascontext;
      	if( $(this).val() && $(this).val()!=""){
       	hascontext=true;
      }
      if(hascontext){
      	csParams.context = {};
			if($("#SG__context_registration").val() !=""){
					csParams.context.registration = $("#SG_result_registration").val();
			}
			if($("#SG_context_instructor_mbox").val() !=""){
					var inst = {"mbox" : "mailto:"+ $("#SG_result_instructor_mbox").val(),"name": $("#SG_result_instructor_name").val(),"objectType": "Agent"};
					csParams.context.instructor = inst;
			}
			
			if($("#SG_context_team_name").val() !=""){
				csParams.context.team = {};
				csParams.context.team["name"]=$("#SG_context_team_name").val();
				var teammemberlist=unescape(cleanTextArea(document.getElementById("SG_context_team_members")) );
				csParams.context.team["members"]="["+teammemberlist+"]";//array of agent objects
			}//end if($("#SG_context_team_name
      
      }//end if(hascontext
      
      });//end each
      
     //attachments area
      $.each($("input[id^=SG_attachments_]"),function(){
      	var hasattachment;
      	if( $(this).val() && $(this).val()!=""){
       		hasattachment=true;
      	}
      
        if(hasattachment){
      	csParams.attachments = {};
      		if($("#SG_attachments_UsageType").val() !=""){
					csParams.usageType = $("#SG_attachments_UsageType").val();//change to language map format
			}
			if($("#SG_attachments_display_title").val() !=""){
					csParams.display = $("#SG_attachments_display_title").val();//change to language map format
			}
		 	if($("#SG_attachments_description").val() !=""){
					csParams.description = $("#SG_attachments_description").val();//change to language map format
			}
			if($("#SG_attachments_content_type").val() !=""){
					csParams.contentType = $("#SG_attachments_content_type").val();//change to language map format
			}
			if($("#SG_attachments_length").val() !=""){
					csParams.length = $("#SG_attachments_length").val();//change to language map format
			}
			if($("#SG_attachments_sha2").val() !=""){
					csParams.sha2 = $("#SG_attachments_sha2").val();//change to language map format
			}
			if($("#SG_attachments_fileURL").val() !=""){
					csParams.fileURL = $("#SG_attachments_fileURL").val();//change to language map format
			}
		 
      }//end if(hasattachment
  	 });//end each
      
	 generateStatement(csParams);
}//end function setStatementParams()	  
 	
 	function allScoreInputsFilled() {
    	var allScoreInputsFilled = true;
    		$("input[id^=#SG_result_score_]").each(function() {
        		if($(this).val() == '') allScoreInputsFilled = false;
    		});
    	return allScoreInputsFilled;
	} 
	
 	function generateStatement(params){
 	//$('#form1').validationEngine('validate');
		var thejson = JSON.stringify(params);
		if(testing){console.log(thejson);}
		alert(thejson);
		 sendStatement(params);
	}	 

	/*
Send Agent Profile
function sendAgentProfile(agent, profileid, profileval, matchHash, noneMatchHash, callback)
Sends an Agent Profile to the LRS.
Parameters: agent - the agent this profile is related to profileid - the id you want associated with this profile 
profileval - the profile 
matchHash - the hash of the profile to replace or to replace any 
noneMatchHash - the hash of the current profile or to indicate no previous profile 
callback - function to process after request has completed.
Parameters passed to callback: error - an error message if something went wrong
response - the response object body - the body of the response if there is one

Get Agent Profile
function getAgentProfile(agent, profileid, since, callback)
Gets an Agent Profile from the LRS.
Parameters: 
	agent - the agent associated with this profile 
	profileid - (optional - if not included, the response will be a list of profileids associated with the agent) the id of the profile 
	since - date object telling the LRS to return objects newer than the date supplied 
	callback - function to process after request has completed.
Parameters passed to callback: 
	error - an error message if something went wrong
	response - the response object body - the body of the response if there is one	
	*/
	
 	function sendAgentProfile(){ //use for first-time send of a particular piece of the profile - "id", such as "roles", "accomplishments", etc.
 		//check current values of required params.
 		var theprofile = unescape(cleanTextArea(document.getElementById("agentProfile")) ); 
 		var theagent = {"mbox" : "mailto:"+ $('#AgentProfile_mbox').val(),"name": $('#AgentProfile_name').val(),"objectType": "Agent"};
    	//var theagent = unescape(cleanTextArea(document.getElementById("theagent")) );
    	//var theagent = $.parseJSON( unescape(cleanTextArea( document.getElementById("theagent") ) ) ) ;
    	//var myagent = {"mbox" : "mailto:"+ $('#mbox').val(),"name": $('#name').val(),"objectType": "Agent"};
    	//check if something is typed into the Other box? If so use it.
    	var theprofileid = ($("theprofileid_other").val()!=="")?$("theprofileid_other").val():$("#theprofileid").val();
    	//note that this could still="" if they did not select from the dropdown so we have to set a default value of "roles" next.
    	theprofileid = ((theprofileid!="")&&(typeof theprofileid!="undefined"))?theprofileid:"competencies";
    	//var theprofileid ="";
 		
 		
 		//first, check if this profile segment exists! if it does, then use update instead.
 		
 		adl.getAgentProfile(theagent, theprofileid, null, function (err, resp, bdy) {
    		if (err) {
       			adl.log("error", "request error: " + err);
       			if((typeof resp == "undefined")||(resp==null)||(resp=="[undefined]")){ //if it comes back undefined, it doesn't exist yet. just send profile
       				adl.sendAgentProfile(theagent, theprofileid, theprofile, null, "*", function (err, resp, bdy) {
    					if (err) {
        						adl.log("error", "request error: " + err);
        						$('#result').html( '<b>Request Error:</b><br/>'+err+' Response'+resp);
    							} else {
       								adl.log("info", "status: " + resp.statusCode);
       								$('#result').html( '<b>Status:</b><br/>'+resp.statusCode); 
   								}
							});	
       			}
				} else {
						adl.log("info", "profile: " + bdy);
						//it does exist, so create hash and update profile with new data
						var profhash = adl.hash(JSON.stringify(bdy)); //this is an md5 function used to doublecheck integrity of data
						adl.sendAgentProfile(theagent, theprofileid, theprofile[theprofileid], profhash, null, function (err, resp, bdy) {
							if (err) {
									adl.log("error", "request error: " + err);
							} else {
									adl.log("info", "status: " + resp.statusCode);
							}
						});//end adl.sendAgentProfile
				}//end else
		});//end adl.getAgentProfile
		   	

	} //end function sendAgentProfile()
		
	
	function updateAgentProfile(){
		//update a profile 
		var profhash = adl.hash(JSON.stringify(theprofile)); //this is an md5 function used to doublecheck integrity of data
		theprofile = theprofile["roles"].push("isEducator");
		adl.sendAgentProfile(theagent, "roles", theprofile["roles"], profhash, null, function (err, resp, bdy) {
			if (err) {
					adl.log("error", "request error: " + err);
				} else {
					adl.log("info", "status: " + resp.statusCode);
				}
		});
	}		
	
	function getAgentProfile(){
	}
	function expandtext(id){
		$("#"+id).toggleClass("closed open"); 
		$("#"+id).nextAll('textarea').eq(0).toggleClass("closed open");
		 
	}	
	
	function checkIfOther(id){
		if( $('#'+id).val() == "other"){
			$('#'+id).hide();$('#'+id+'_other').show();
		}
	}	
  
 
 //var sha256;

  function readBlob(opt_startByte, opt_stopByte, sha256) {

    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
       // document.getElementById('byte_content').textContent = evt.target.result;
       // document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop + 1,
             ' of ', file.size, ' byte file'].join('');

        //**UPDATED SOLUTION: Since its binary data, the message needs to be converted from string to bytes using Latin1**
            sha256.update(CryptoJS.enc.Latin1.parse(evt.target.result));

        var hash = sha256.finalize();
		//alert('file size'+file.size);
		document.getElementById('SG_attachments_length').value = file.size;
       // document.getElementById('attachSHA').value = ['SHA-256: ', hash].join('');
         document.getElementById('SG_attachments_sha2').value = [hash].join('');
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }

  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
      var startByte = evt.target.getAttribute('data-startbyte');
      var endByte = evt.target.getAttribute('data-endbyte');

      sha256 = CryptoJS.algo.SHA256.create();

      readBlob(startByte, endByte, sha256);
    }
  }, false);
 
