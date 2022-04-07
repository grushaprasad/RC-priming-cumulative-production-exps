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

//SetCounter("counter", 0);
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
    

    newText("prompt", row.sentence)
        .settings.center()
        .settings.css("user-select", "none")
        .print()
    ,


    newButton("progress", "Click to progress")
        .settings.center()
        .settings.css("margin", "20px")
        .settings.log()
        .print()
        // .wait(getTextInput("response").test.text(new RegExp(row.sentence+"\\s+\\w+", 'i')))
        .wait()
        .remove()
    ,

    getText("prompt")
        .remove()
    ,


    newVar("RT").global().set(v_rt => Date.now())
    ,

    ( row.truncated=="yes" ? [
        newText("instructions", "<b>Re-type the partial sentence in the prompt and complete it.</b>")
            .settings.center()
            .settings.css("font-size", "medium")
            .print()
    ] : [
        newText("instructions", "<b>Re-type the full sentence in the prompt.</b>")
            .settings.center()
            .settings.css("font-size", "medium")
            .print()
    ] )
    ,
    
    newTextInput("response")
      .print()
      .settings.size(800, 75)
      .settings.log("final")
    ,
    
    ( row.truncated=="yes" ? [
        newText("troubleshooting", "<br> Trouble progressing? Make sure that you typed in the prompt correctly and added a valid completion. <b> <br> Do not refresh the page. Your progress will be lost</b>")
            .settings.center()
            // .settings.css("position", "relative", "height", "1500")
            .print()
    ] : [
        newText("troubleshooting", "<br> Trouble progressing? Make sure that you typed in the prompt correctly. <b> <br> Do not refresh the page. Your progress will be lost</b>")
            .settings.center()
            // .settings.css("position", "relative", "height", "1500")
            .print()
    ] )
    ,

    newButton("read_again", "Read prompt again")
        .settings.center()
        .settings.css("margin", "20px")
        .settings.log()
        .print()
        .callback( 
            getButton("continue")
                .remove()
            ,
            getTextInput("response")
                .remove()
            ,

            getText("instructions")
                .remove()
            ,
            
            getText("troubleshooting")
                .remove()
            ,
            
            getButton("read_again")
                .remove()
            ,

            getText("prompt")
                .print()
            ,
            
            // newButton("progress", "Click to progress")
            //     .settings.center()
            //     .settings.css("margin", "20px")
            //     .settings.log()
            //     .print()
            //     .wait()
            //     .remove()
            // ,
            
            getButton("progress")
                .print()
                .wait()
                .remove()
            ,

            getText("prompt")
                .remove()
            ,

            getText("instructions")
                .print()
            ,

            getTextInput("response")
                .print()
                .settings.log("final")
            ,  
            
            getText("troubleshooting")
                .print()
            ,
            
            // ( row.truncated=="yes" ? [
            //     newText("troubleshooting", "<br> Trouble progressing? Make sure that you typed in the prompt correctly and added a valid completion. <b> <br> Do not refresh the page. Your progress will be lost</b>")
            //         .settings.center()
            //         // .settings.css("position", "relative", "height", "1500")
            //         .print()

            // ] : [
            //     newText("troubleshooting", "<br> Trouble progressing? Make sure that you typed in the prompt correctly. <b> <br> Do not refresh the page. Your progress will be lost</b>")
            //         .settings.center()
            //         // .settings.css("position", "relative", "height", "1500")
            //         .print()
            // ] )
            // ,   
            
            getButton("read_again")
                .print()
            ,
            
            getButton("continue")
                .print()

        )
    ,

    ( row.truncated=="yes" ? [
        newButton("continue", "Next prompt")
            .settings.center()
            .settings.css("margin", "20px")
            .settings.log()
            .print()
            .wait(getTextInput("response").test.text(new RegExp(row.sentence+"\\s+\\w+", 'i')))
            //.wait(getTextInput("response").test.text(new RegExp("\\w+")))
            .remove()

    ] : [
        newButton("continue", "Next prompt")
            .settings.center()
            .settings.css("margin", "20px")
            .settings.log()
            .print()
            .wait(getTextInput("response").test.text(new RegExp(row.sentence, 'i')))
            .remove()
    ] )

    ,
    

    // newButton("continue", "Next prompt")
    //     .settings.center()
    //     .settings.css("margin", "20px")
    //     .settings.log()
    //     .print()
    //     .wait(getTextInput("response").test.text(new RegExp(row.sentence+"\\s*\\w*", 'i')))
    //     //.wait(getTextInput("response").test.text(new RegExp(row.sentence+"\\s+\\w+", 'i')))
    //     //.wait(getTextInput("response").test.text(new RegExp("\\w+")))
    //     .remove()
    // ,


    getVar("RT").set( v_rt => Date.now() - v_rt )
    ,
    
    getButton("read_again")
        .remove()
        
    ,

    getTextInput("response")
        .remove()
    ,
    
    getText("instructions")
        .remove()
    ,
    
    getText("troubleshooting")
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
    .log("truncated", row.truncated)
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
);

// PennController.DebugOff();






