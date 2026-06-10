
/*
SAIL Research Solution - Tally Form Loader

How to activate:
1. Create your Tally form.
2. Copy only the Tally form ID from the form link.
   Example: https://tally.so/r/obz8vX
   Form ID: abc123
3. Replace YOUR_TALLY_FORM_ID below with your actual form ID.
*/

const SAIL_TALLY_FORM_ID = "obz8vX";

(function(){
  const mount = document.getElementById("tally-form-mount");
  const placeholder = document.getElementById("tally-form-placeholder");

  if(!mount) return;

  if(!SAIL_TALLY_FORM_ID || SAIL_TALLY_FORM_ID === "YOUR_TALLY_FORM_ID"){
    if(placeholder) placeholder.style.display = "block";
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("data-tally-src", `https://tally.so/embed/${SAIL_TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`);
  iframe.setAttribute("width", "100%");
  iframe.setAttribute("height", "720");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("marginheight", "0");
  iframe.setAttribute("marginwidth", "0");
  iframe.setAttribute("title", "SAIL Research Solution Requirement Form");
  iframe.className = "tally-iframe";

  mount.innerHTML = "";
  mount.appendChild(iframe);

  const script = document.createElement("script");
  script.src = "https://tally.so/widgets/embed.js";
  script.async = true;
  document.body.appendChild(script);
})();
