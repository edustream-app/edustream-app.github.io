document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

var shown = 0;
var news_shown = 0;
var deleting = 0;

function file(fichier) {
    if (window.XMLHttpRequest) // FIREFOX
        xhr_object = new XMLHttpRequest();
    else if (window.ActiveXObject) // IE
        xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
    else
        return (false);
    xhr_object.open("GET", fichier, false);
    xhr_object.send(null);
    if (xhr_object.readyState == 4) return (xhr_object.responseText);
    else return (false);
};

function afficher_menu(boite) {
    /* On regarde si un autre menu est ouvert */
    if (boite != "ulaccueil")
        document.getElementById("ulaccueil").style.visibility = "hidden";

    if (boite != "ulpol")
        document.getElementById("ulpol").style.visibility = "hidden";

    if (boite != "ulforums")
        document.getElementById("ulforums").style.visibility = "hidden";

    if (boite != "ulmembres")
        document.getElementById("ulmembres").style.visibility = "hidden";

    /* On remet tout en noir */
    document.getElementById("ulaccueil_link").style.color = "#CCFFFF";
    document.getElementById("ulpol_link").style.color = "#CCFFFF";
    document.getElementById("ulforums_link").style.color = "#CCFFFF";
    document.getElementById("ulmembres_link").style.color = "#CCFFFF";

    /* On ouvre ou ferme le menu */
    if (document.getElementById(boite).style.visibility == "visible") {
        document.getElementById(boite + "_link").style.color = "#CCFFFF";
        document.getElementById(boite).style.visibility = "hidden";
    }
    else {
        document.getElementById(boite + "_link").style.color = "#FFFFFF";
        document.getElementById(boite).style.visibility = "visible";
    }
    //menuul li:hover ul
}

function loadimage() {
    image = document.createElement("img")
    image.setAttribute("src", "http://www.playonlinux.com/test/pol.php")
    document.body.appendChild(image)
}

function show_privmessage(id, sent) {
    if (deleting == 0) {
        adresse = url + "/messages/see_mess_ajax.php?mess=" + id;
        //location.href = adresse;
        //texte = "Afficher le message "+id;
        if (document.getElementById("message_" + id).style.display == "block") {
            $("div#message_" + id).hide(300);
            shown = id;
            //$("div#message_"+shown).html("");
        }
        if (shown != id) {
            if (sent == false) {
                $("img#pmessage_image_" + id).attr("src", url + "/images/forums/vert.png");
                file(adresse);
            }
            $("div#message_" + id).show(300);
            shown = id;
        }
        else {
            shown = 0;
        }
    }
    deleting = 0;
}

function show_download(div, fichier) {
    $("div#content").load(fichier);
}

function delete_pmessage(id) {
    if (confirm("Are you sure you want to delete this message ?")) {
        file(prefixe + "/delete_private_message_confirm-" + id + "-0.html");
        $("div#message_title_" + id).hide(300);
        $("div#message_" + id).hide(300);
    }
    deleting = 1;
}

function delete_pmessage_s(id) {
    if (confirm("Are you sure you want to delete this message ?")) {
        file(prefixe + "/delete_private_message_confirm-" + id + "-1.html");
        $("div#message_title_" + id).hide(300);
        $("div#message_" + id).hide(300);
    }
    deleting = 1;
}

function delete_page(id) {
    if (confirm("Are you sure you want to delete this page ?")) {
        file(url + "/admin/pages/delete_ajax.php?id=" + escape(id));
        $("div#reponse_" + id).hide(300);
        $("div#page_" + id).hide(300);
    }
    deleting = 1;
}

function faq_show(id) {
    if (shown != 0) {
        $("div#reponse_" + shown).hide(300);
        //$("div#message_"+shown).html("");
    }
    if (shown != id) {
        //$("img#pmessage_image_"+id).attr("src",url+"/images/forums/vert.png");
        //file(adresse);
        $("div#reponse_" + id).show(300);
        shown = id;
    }
    else {
        shown = 0;
    }
}

function pres_show(id) {
    if (news_shown != 0) {
        $("div#pres_item" + news_shown).slideUp(300);
        //$("div#message_"+shown).html("");
        if (news_shown == 5) {
            $("div#presentation5").addClass("no_bottom");
        }
    }
    if (news_shown != id) {
        //$("img#pmessage_image_"+id).attr("src",url+"/images/forums/vert.png");
        //file(adresse);
        $("div#pres_item" + id).slideDown(300);
        news_shown = id;
        if (id == 5) {
            $("div#presentation5").removeClass("no_bottom");
        }
    }
    else {
        news_shown = 0;
    }
}

function pres_show_script(id, lng) {
    if (news_shown != 0) {
        $("div#pres_item" + news_shown).slideUp(300);
        $("div#pres_item" + news_shown).html("");
    }
    if (news_shown != id) {
        //$("div#pres_item"+id).load(url+"/"+lng+"/app_ajax-"+id+".html");
        $("div#pres_item" + id).slideDown(300, function () {
            $("div#pres_item" + id).load(url + "/" + lng + "/app_ajax-" + id + ".html");
        });
        news_shown = id;

    }
    else {
        news_shown = 0;
    }
}

function read_source(id) {
    if (news_shown == id) {
        loadUrl = url + '/repository/source.php?script=' + id + '&ajax=true';
        $("div#pres_item" + id).load(loadUrl, null, function (responseText) {
            SyntaxHighlighter.all();
            //document.write(html);

        });

        //
        //alert(file(url+"/repository/app.php?ajax=true&script="+id))
        $("div#pres_item" + id).slideDown(300);
        news_shown = id;
    }
}

function set_name(valeur) {
    document.getElementById("pseudo_box").value = valeur;
    $("div#pseudobox_content").hide(300);
}

function look_for(texte) {
    if (texte == "") {
        $("div#pseudobox_content").hide(300);
    }
    else {
        $("div#pseudobox_content").load(url + "/js/ajax/membre_ajax.php?membre=" + escape(texte)).show(300);
    }
}


function ajax_apercu(message, auteur) {
    $("div#apercu").hide(0);
    if (auteur != '')
        $("div#apercu").load(url + '/forums/previsualisation.php?message=' + escape(message) + '&auteur=' + escape(auteur)).show(300);
}

function secret(div2) {

    var divs = div2.getElementsByTagName('div');
    var div3 = divs[0];
    div3.setAttribute("id", "temp_id");

    if (div3.style.display == "block")
        $("div#temp_id").slideUp(200)
    else
        $("div#temp_id").slideDown(200)

    div3.removeAttribute("id");
}

// JavaScript Document
//script chopé sur http://actuel.fr.selfhtml.org/articles/javascript/bbcode/index.htm
// merci :D

function insertion(repdeb, repfin) {
    var input = document.forms['formulaire'].elements['message'];
    input.focus();
    /* pour l'Explorer Internet */
    if (typeof document.selection != 'undefined') {
        /* Insertion du code de formatage */
        var range = document.selection.createRange();
        var insText = range.text;
        range.text = repdeb + insText + repfin;
        /* Ajustement de la position du curseur */
        range = document.selection.createRange();
        if (insText.length == 0) {
            range.move('character', -repfin.length);
        } else {
            range.moveStart('character', repdeb.length + insText.length + repfin.length);
        }
        range.select();
    }
    /* pour navigateurs plus récents basés sur Gecko*/
    else if (typeof input.selectionStart != 'undefined') {
        /* Insertion du code de formatage */
        var start = input.selectionStart;
        var end = input.selectionEnd;
        var insText = input.value.substring(start, end);
        input.value = input.value.substr(0, start) + repdeb + insText + repfin + input.value.substr(end);
        /* Ajustement de la position du curseur */
        var pos;
        if (insText.length == 0) {
            pos = start + repdeb.length;
        } else {
            pos = start + repdeb.length + insText.length + repfin.length;
        }
        input.selectionStart = pos;
        input.selectionEnd = pos;
    }
    /* pour les autres navigateurs */
    else {
        /* requête de la position d'insertion */
        var pos;
        var re = new RegExp('^[0-9]{0,3}$');
        while (!re.test(pos)) {
            pos = prompt("Insertion à la position (0.." + input.value.length + "):", "0");
        }
        if (pos > input.value.length) {
            pos = input.value.length;
        }
        /* Insertion du code de formatage */
        var insText = prompt("Veuillez entrer le texte à formater:");
        input.value = input.value.substr(0, pos) + repdeb + insText + repfin + input.value.substr(pos);
    }
}

function replace_select(id_liste) {
    document.getElementById(id_liste).options[0].selected = true;
}

function insert_code(code, title) {
    if (title == '')
        $("p#code_album").html("<b>BB Code :</b> [box][URL]/images/uploads/" + code + ".jpg[/box]");
    else
        $("p#code_album").html("<b>BB Code :</b> [box title=" + title + "][URL]/images/uploads/" + code + ".jpg[/box]");
}

function search_box(valuebox) {
    if (valuebox == "")
        $("input#search_button").fadeOut(500).get(0).disabled = true;
    else
        $("input#search_button").fadeIn(500).get(0).disabled = false;

}

function envahir(i) {
    var x = Math.random();
    var y = Math.random();
    x = Math.ceil(x * (screen.width - 200));
    y = Math.ceil(y * (screen.height - 300));
    delais = Math.ceil(Math.random() * 200)
    //alert(x);
    $("body").append("<img src='http://www.playonlinux.com/images/tux.png' alt='' style='position:absolute;left:" + x + "px;top:" + y + "px'>");


    if (i < 100) {
        setTimeout("envahir(" + (i + 1) + ");", delais);
    }
}

if (window.addEventListener) {
    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
    window.addEventListener("keydown", function (e) {
        kkeys.push(e.keyCode);
        if (kkeys.toString().indexOf(konami) >= 0)
            envahir(0)
    }, true);
}

function hide_all() {
    if (document.getElementById("champ42")) {
        document.getElementById("champ42").setAttribute('class', 'mail');
        document.getElementById("field1").setAttribute('class', 'mail');
        document.getElementById("champ4").setAttribute('style', 'display:none');
    }
}

window.onload = hide_all;


$(document).ready(function () {
    $("textarea[rel='reply_content']").keypress(function (event) {

        if (event.keyCode == 13 && !event.shiftKey) {
            $(this).closest("form").submit();
            return false;
        }

    });

    $(".expander").each(function () {
        divId = "expander_" + $(this).attr("data-content");

        if ($(this).hasClass("reduced")) {
            $("div#" + divId).hide(0);
        }
        $(this).on("click", function () {
            divId = "expander_" + $(this).attr("data-content");
            if ($(this).hasClass("reduced")) {
                $(this).removeClass("reduced");
                $("div#" + divId).show(400);
            }
            else {
                $(this).addClass("reduced");
                $("div#" + divId).hide(400);
            }
        });
    });

    //$('.pol_tooltip').tooltip();


    //$('a.lightbox').lightBox();


    $(".code.playonlinux").each(function () {
        $(this).attr('class', 'brush: playonlinux;');
    });
    $(".code.python").each(function () {
        $(this).attr('class', 'brush: python;');
    });
    $(".code.javascript").each(function() {
        $(this).attr('class', 'brush: jscript;');
    });
    $(".code.java").each(function () {
        $(this).attr('class', 'brush: java;');
    });
    $(".code.diff").each(function () {
        $(this).attr('class', 'brush: diff;');
    });
    SyntaxHighlighter.autoloader(
        ['diff', '/js/highlighter/diff.js'],
        ['playonlinux', '/js/highlighter/playonlinux.js'],
        ['python', '/js/highlighter/python.js'],
        ['jscript', '/js/highlighter/jscript.js']
    );
    SyntaxHighlighter.all();


    $('textarea[data-editor]').each(function () {
        var textarea = $(this);

        var mode = textarea.data('editor');

        var editDiv = $('<div>', {
            position: 'absolute',
            width: textarea.width(),
            height: textarea.height(),
            'class': textarea.attr('class')
        }).insertBefore(textarea);

        textarea.css('visibility', 'hidden');

        var editor = ace.edit(editDiv[0]);
        editor.renderer.setShowGutter(false);
        editor.getSession().setValue(textarea.val());
        editor.getSession().setMode("ace/mode/" + mode);
        // editor.setTheme("ace/theme/idle_fingers");
        // copy back to textarea on form submit...
        textarea.closest('form').submit(function () {
            textarea.val(editor.getSession().getValue());
        })

    });
});


/*!
* jQuery Cookie Plugin v1.4.1
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2006, 2014 Klaus Hartl
* Released under the MIT license
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
// AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
// CommonJS
        factory(require('jquery'));
    } else {
// Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
// This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
// Replace server-side written pluses with spaces.
// If we can't decode the cookie, ignore it, it's unusable.
// If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

// Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

// Read

        var result = key ? undefined : {};

// To prevent the for loop in the first place assign an empty array
// in case there are no cookies at all. Also prevents odd result when
// calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
// If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

// Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

// Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, {expires: -1}));
        return !$.cookie(key);
    };

}));
