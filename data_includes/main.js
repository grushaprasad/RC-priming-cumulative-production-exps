// PennController.Sequence( "instructions", randomize("practice_trial1"), "start_exp1", randomize("without_precursor"), "end_part1", randomize("practice_trial2"), "start_exp2", randomize("with_precursor"), "demographic", "send_results", "exp_end");

PennController.Sequence("consent", "counter", "demographic", "instructions", "experiment", "participant_obs", "send_results", "exp_end");

PennController.ResetPrefix(null);

//PennController.PreloadZip("https://consonant-perception-exp1.s3.us-east-2.amazonaws.com/mp3_test.zip");


PennController("consent",

    newHtml("consent", "consent.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("consent").test.complete()
                .failure( getHtml("consent").warn() )
        )
);

SetCounter("counter", "inc", 1);


PennController("demographic",

    newHtml("demographics", "demographic.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("demographics").test.complete()
                .failure( getHtml("demographics").warn() )
        )
);


PennController("instructions",

    newHtml("instructions", "instructions.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Start experiment")
        .settings.center()
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("instructions").test.complete()
                .failure( getHtml("instructions").warn() )
        )
);


PennController.Template(row => PennController( "experiment" ,
    
    newText("reminder", "<b>Remember you do have to re-type the prompt. Complete the sentences with the first thing that comes to mind.</b>")
        .settings.center()
        .settings.css("font-size", "small")
        .print()
    ,

    newText("prompt", row.sentence)
        .settings.center()
        .settings.css("user-select", "none")
        .print()
    ,

    newVar("RT").global().set(v_rt => Date.now())
    ,
    
    newTextInput("response")
      .print()
      .settings.size(800, 75)
      .settings.log("final")
    ,

    // newText("troubleshooting", "Trouble progressing? Make sure that you typed in the prompt correctly. <b> <br> Do not refresh the page. Your progress will be lost</b>")
    //     .settings.center()
    //     .settings.css("font-size", "medium")
    //     .print()
    // ,

    newButton("continue", "Next prompt")
        .settings.center()
        .settings.css("margin", "20px")
        .settings.log()
        .print()
        // .wait(getTextInput("response").test.text(new RegExp(row.sentence+"\\s+\\w+", 'i')))
        .wait(getTextInput("response").test.text(new RegExp("\\w+")))
        .remove()
    ,



    getVar("RT").set( v_rt => Date.now() - v_rt )
    ,
    
    getText("prompt")
        .remove()
    ,

    getTextInput("response")
        .remove()
    ,

    newText("transition", " ")
        .settings.center()
        .print()
    ,

    newTimer("ITI", 1000)
        .start()
        .wait()
    ,

    getText("transition")
        .remove()
    
    )

    .log("sent_type", row.sent_type)
    .log("struc", row.struc)
    .log("prime_type", row.prime_type)
    .log("verb", row.verb)
    .log("verb_num", row.verb_num)
    .log("sent_id", row.sent_id)
    .log("sentence", row.sentence)
    .log("RT", getVar("RT"))
    .log("RT_target", getVar("RT_target"))
    .log("RT_resp", getVar("RT_resp"))
    .log("List", row.Group)
);


PennController("participant_obs",

    newHtml("participant_obervations", "participant_observations.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Finish experiment")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("participant_obervations").test.complete()
                .failure( getHtml("participant_obervations").warn() )
        )
);

PennController.SendResults("send_results");

PennController("exp_end", 
    newHtml("end", "end_of_exp.html")
        .settings.log()
        .print()
    ,


    newTimer("forever", 1)
        .wait()            // Timer never started: will wait forever
)

PennController.DebugOff()






