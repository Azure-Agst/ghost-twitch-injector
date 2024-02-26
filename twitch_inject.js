var username = "azure_agst";

var inject_twitch = () => {
    var s = document.createElement("script");
    s.src = "https://player.twitch.tv/js/embed/v1.js"
    document.body.appendChild(s);
};

var inject_html = (base) => {

    // Create player div
    var player = document.createElement("div");
    player.id = "twitch-player";
    base.appendChild(player);

    // Create contents of text div
    var h2 = document.createElement("h2");
    h2.innerHTML = "Hey! I'm live on Twitch!";
    var p = document.createElement("p");
    p.innerHTML = "Come drop by and say hi!";
    var a = document.createElement("a");
    a.href = "https://twitch.tv/"+username+"/";
    console.log("weeeee", a.href);
    console.log(a);
    var btn = document.createElement("button");
    btn.innerHTML = "To Twitch &rarr;";

    // Create text div
    var info = document.createElement("div");
    info.id = "twitch-info"
    info.appendChild(h2); info.appendChild(p);
    a.appendChild(btn); info.appendChild(a);
    base.appendChild(info);

    // inject div
    const main = document.getElementById("site-main");
    main.insertBefore(base, main.firstChild);
};

var twp = (_) => {

    // see if element exists
    var el = document.getElementById("twitch-embed");
    if (el === null) {
        return;
    }

    // inject twitch, if needed
    if (typeof Twitch === "undefined") {
        inject_twitch();
        setTimeout(twp, 250);
        return;
    }

    // inject html
    inject_html(el);

    // create player
    var player = new Twitch.Player("twitch-player", {
        channel: username,
        width: "100%",
        height: "100%",
        muted: true
    })

    // define callbacks
    var init = () => {
        player.addEventListener(Twitch.Player.ONLINE, onlineHandler);
        player.addEventListener(Twitch.Player.OFFLINE, offlineHandler);
        player.removeEventListener(Twitch.Player.READY, init);
    }
    var onlineHandler = () => {
        document.getElementById("twitch-embed").style.display = "block flex";
        player.removeEventListener(Twitch.Player.ONLINE, onlineHandler);
        player.addEventListener(Twitch.Player.OFFLINE, offlineHandler);
    }
    var offlineHandler = () => {
        document.getElementById("twitch-embed").style.display = "none";
        player.removeEventListener(Twitch.Player.OFFLINE, offlineHandler);
        player.addEventListener(Twitch.Player.ONLINE, onlineHandler);
    }

    // register initial callback
    player.addEventListener(Twitch.Player.READY, init);

};

addEventListener("load", twp);
