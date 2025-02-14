+++
date = '2025-02-10T22:54:52+01:00'
draft = false
title = 'Marine Life'
featured_image = ""
description = "A game built to raise awareness of the ocean cleanliness"
+++

<div id="gameframe"></div>
<div class="inst_table game"s>
    <table>
        <tr>
            <th class>Game Controls:</th>
            <th class="item">How to play</th>
        </tr>
        <tr>
            <td>Left-click<br>Right-click</td>
            <td class="item"> Try to survive the longest while avoiding plastics and other sorts of garbage. Eat algae to produce more fish.</td>
        </tr>
    </table>
</div>
<script src="/js/table_renderer.js"></script>
<script>
    var curr_Path = window.location.pathname;
    var gameDiv = document.getElementById('gameframe');
    if(curr_Path === "/games/marine-life/" && gameDiv.childElementCount === 0){
        const iframe = document.createElement("iframe");
        iframe.classList.add('game');
        iframe.src = "/playableGames/Marine-Life/web/index.html";
        iframe.width = "600px";
        iframe.height = "600px";
        document.getElementById('gameframe').appendChild(iframe);
        console.log("Woohoo!");
    }
</script>

Marine Life is an awe-inspiring game that encourages its players to think about the ocean life. Based on a school assignment about raising awareness of one of UN's worldly goals while in cooperation with the UN (_just a pretend scenario_), this game aims to raise awareness about sea life. 