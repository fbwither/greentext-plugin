//META{"name":"greentext"}*//

class greentext {

    getName() {
        return "greentext";
    }

    getDescription() {
        return "adds 4chan-like greentext highlighting";
    }

    getVersion() {
        return `. 0.0.1`;
    }

    getAuthor() {
        return "fbwither";
    }

    load() { }

    start() {
        var libraryScript = null;
        if (typeof BDFDB !== "object"/* || BDFDB.isLibraryOutdated()*/) {
            if (typeof BDFDB === "object") BDFDB = "";
            libraryScript = document.querySelector('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js"]');
            if (libraryScript) libraryScript.remove();
            libraryScript = document.createElement("script");
            libraryScript.setAttribute("type", "text/javascript");
            libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js");
            document.head.appendChild(libraryScript);
        }
        var libraryScript = document.getElementById('zeresLibraryScript');
        if (typeof BDFDB !== "undefined") this.initialize();
        else libraryScript.addEventListener("load", () => { this.initialize(); });
    }

    initialize() {
        //PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), "https://github.com/Metalloriff/BetterDiscordPlugins/raw/master/TheClapBestClapPluginClapEver.plugin.js");
        this.attach();
        /*InternalUtilities.addOnSwitchListener(this.attach);*/
    }

    onSwitch() {
        this.attach();
    }

    attach() {
        var css = "\n\
                        .green-text{\n\
                            color: #789922;\n\
                        }\n\
                     ";
        BdApi.injectCSS("green-text", css)
		setInterval(() => {
            var a = document.querySelectorAll("div.da-markup");
            a.forEach((el, ind) => {
                console.log(el);
                /*if (el.innerText.match(/\n?>*\n/)) {
                    el.classList.add("green-text");
                }*/
                var b = el.innerHTML.split("\n");
                b.forEach((el1)=>{
                    if(el1.startsWith("&gt;")){
                        b[b.indexOf(el1)] = `<span class="green-text">${el1}</span>`;
                    }
                });
                el.innerHTML = b.join("\n");
            });
        }, 250);
		
    }
    stop() {
        var chatboxJQ = $("textarea");
        chatboxJQ.off("keydown.CRYPT");
    }
}