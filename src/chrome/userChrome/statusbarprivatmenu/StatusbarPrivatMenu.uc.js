    (function(){
    var smallmenuPopup =document.createElement("menupopup");
    smallmenuPopup.setAttribute("id","smallmenuPopupid");

    var label1=document.createElement("menuitem");
    label1.setAttribute("label","Privaten Modus starten");
    label1.setAttribute("oncommand","document.getElementById('privateBrowsingItem').click()");

    var label2=document.createElement("menuitem");
    label2.setAttribute("label","Neueste Chronik l\u00F6schen");
    label2.setAttribute("oncommand","document.getElementById('sanitizeItem').click()");

    var label3=document.createElement("menuitem");
    label3.setAttribute("label","Addons Manager \u00F6ffnen");
    label3.setAttribute("oncommand","document.getElementById('menu_openAddons').click()");

    smallmenuPopup.appendChild(label1);
    smallmenuPopup.appendChild(label2);
    smallmenuPopup.appendChild(label3);

    var statusbarW = document.getElementById("status-bar");
    // var statusbarW = document.getElementById("addon-bar");
    var smallmenu = document.createElement("menuitem");
    smallmenu.setAttribute("id","smallmenuId");
    smallmenu.setAttribute("class","statusbarpanel-menu-iconic");
    smallmenu.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVQ4jc2SUQ3DMAxEH4RAKIRAMIRCKIRBCIRCKIRBGIRBCIQy6D5yVfyRaMnXZilSlTu/9GTDP1UETCc09MXpsQd4AxewNfRbe/UAAEmmZ+P1Syf1mm9AltHXrpeHALuMq7vPlFhDAANO4NCdUfLbDOAQBH0/ZgErNcZJHeEwIMicqROZAqBGvxNfAZEyqqQ/2NQQFCFRd6S7ieYiBGdcnGY9wG/qAx/qNl7EZYWxAAAAAElFTkSuQmCC");
    smallmenu.setAttribute("tooltiptext","Mein privates Men\u00FC");

    smallmenu.appendChild(smallmenuPopup);

    statusbarW.appendChild(smallmenu);

    })();