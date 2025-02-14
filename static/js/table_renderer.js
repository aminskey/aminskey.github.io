var inst_tables = document.getElementsByClassName('inst_table game');
var curr_Path = window.location.pathname;

if(curr_Path === "/games/"){
    Array.from(inst_tables).forEach((table) => table.classList.remove('game'));
}