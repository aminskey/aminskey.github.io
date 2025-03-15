var inst_tables = document.getElementsByClassName('inst_table game');
var curr_Path = window.location.pathname;


if(curr_Path.includes("/games/") && curr_Path !== "/games"){
    console.log(curr_Path);
    Array.from(inst_tables).forEach((table) => table.classList.add('game'));
}