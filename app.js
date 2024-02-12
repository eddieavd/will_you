
const form_div = document.getElementById(    "form_div" );
const surv_div = document.getElementById(  "survey_div" );
const succ_div = document.getElementById( "success_div" );
const  err_div = document.getElementById(   "error_div" );

const fname_field = document.getElementById( "fname" );
const lname_field = document.getElementById( "lname" );

const form_btn = document.getElementById( "form_btn" );

const yes_btn = document.getElementById( "yes_btn" );
const  no_btn = document.getElementById(  "no_btn" );
const gay_btn = document.getElementById( "gay_btn" );

const surv_img = document.getElementById( "surv_img" );
const succ_img = document.getElementById( "succ_img" );

let had_nos = false;

const auth_hash = 1340519639;

String.prototype.hashCode = function() {
        var hash = 0, i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++)
        {
                chr = this.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
        }
        return hash;
}

function main ()
{
        surv_div.classList.add( "hidden" );
        succ_div.classList.add( "hidden" );
         err_div.classList.add( "hidden" );
}

function open_survey ()
{
        console.log( "INFO: auth passed" );

        form_div.classList.   add( "hidden" );
        surv_div.classList.remove( "hidden" );
}

function scary ()
{
        const body = document.getElementById( "errbox_id" );
        const text = document.getElementById( "whodis_id" );

        if( body.style.backgroundColor === "rgb(255, 0, 0)" )
        {
                body.style.backgroundColor = "#000000";
                text.style.color = "#FFFFFF";
        }
        else
        {
                body.style.backgroundColor = "#FF0000";
                text.style.color = "#000000";
        }
}

function show_error ()
{
        console.error( "ERROR: auth failed" );

        form_div.classList.   add( "hidden" );
         err_div.classList.remove( "hidden" );

        window.setInterval( scary, 100 );
}

function verify_auth ( fname, lname )
{
        const fullname = fname.toLowerCase() + lname.toLowerCase();

        if( fullname.hashCode() === auth_hash )
        {
                return true;
        }
        else
        {
                return false;
        }
}

function check_form ()
{
        const fname = fname_field.value;
        const lname = lname_field.value;

        if( fname === "" || lname === "" )
        {
                document.getElementById( "ident_id" ).classList.remove( "hidden" );
                return;
        }

        if( !verify_auth( fname, lname ) )
        {
                show_error();
        }
        else
        {
                open_survey();
        }
}

function play_video ()
{
        let iframe = document.createElement( "iframe" );
        let   desc = document.createElement( "p" );

        iframe.setAttribute( "src", "https://www.youtube.com/embed/EV6RnQOPTN4?autoplay=1&rel=0" );

        iframe.setAttribute( "frameborder", "0" );
        iframe.setAttribute( "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" );
        iframe.setAttribute( "allowfullscreen", "" );

        iframe.style.width = "100%";

        desc.innerHTML = "ovo bi trebalo autoplayat al me nekad zajebava oprostity";
        desc.style.fontSize = "36px";

        succ_div.append( iframe );
        succ_div.append(   desc );
}

function on_yes ()
{
        console.log( "INFO: YES!!!" );

        if( had_nos )
        {
                document.getElementById( "had_nos_div" ).classList.remove( "hidden" );
        }
        succ_img.style.width  = "100%";
        succ_img.style.height = "100%";

        surv_div.classList.   add( "hidden" );
        succ_div.classList.remove( "hidden" );

        play_video();
}

function on_no ()
{
        console.error( "ERROR: NO!!!" );

        had_nos = true;

        surv_img.src = "https://c.tenor.com/iskXStrFOHoAAAAC/tenor.gif";

        const yes_h = yes_btn.offsetHeight;
        const  no_h =  no_btn.offsetHeight;

        yes_btn.style.width = "100%";
         no_btn.style.width = "100%";

        yes_btn.style.height   = "" + ( yes_h * 2     ) + "px";
        yes_btn.style.fontSize = "" + ( yes_h * 2 - 2 ) + "px";
         no_btn.style.height   = "" + (  no_h / 2     ) + "px";
         no_btn.style.fontSize = "" + (  no_h / 2 - 2 ) + "px";
}

function on_gay ()
{
        document.getElementById( "notes_img" ).classList.add( "hidden" );
        document.getElementById(  "succ_img" ).classList.add( "hidden" );

        document.getElementById( "gay_btn" ).classList.add( "hidden" );
        document.getElementById( "gay_img" ).classList.remove( "hidden" );
        document.getElementById( "gay_txt" ).classList.remove( "hidden" );
}

form_btn.addEventListener( "click", check_form );

yes_btn.addEventListener( "click", on_yes );
 no_btn.addEventListener( "click", on_no  );
gay_btn.addEventListener( "click", on_gay );

main();
