// ==UserScript==
// @name         Controle Acadêmico ++
// @namespace    http://tst-online.appspot.com/
// @version      0.1
// @description  Userscripts para Controle Acadêmico UFCG
// @author       You
// @match        https://pre.ufcg.edu.br/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (!window.location.href.includes('ProfessorTurmaNotasEditar')) {
        console.log('não é edição de notas...');
        return;
    };

    // adiciona widgets
    let $ta = document.createElement('textarea');
    let $table = document.querySelector('table');
    $ta.placeholder = 'copie e cole seu CSV aqui (matrícula, nota1, nota2, nota3, final)';
    $ta.style.width = '100%';
    $ta.style.height = '10em';
    $ta.style.fontFamily = 'monospace';
    $table.parentElement.insertBefore($ta, $table);

    let $button = document.createElement('button');
    $button.setAttribute('type', 'button');
    $button.classList.add('btn');
    $button.classList.add('btn-success');
    $button.innerText = 'Copiar para o diário de classe';
    $button.addEventListener('click', function () {
        copy();
    });
    $table.parentElement.insertBefore($button, $table);

    function csv2json(csv) {
        let lines = csv.match(/[^\r\n]+/g);
        lines.forEach((line, i) => {
            lines[i] = line.split(",");
        });
        return lines;
    };

    function update(data) {
        let map = {};
        data.forEach(o => {
            let matricula = o[0];
            let n1 = o[1];
            let n2 = o[2];
            let n3 = o[3];
            let final = o[4];
            map[matricula] = {n1, n2, n3, final};
        });

        let $table = document.querySelector('table');
        let lines = $table.querySelectorAll('tr');
        lines.forEach(($line, i) => {
            if (i == 0) return;
            let matricula = $line.querySelectorAll('td')[1].innerText;
            if (!map[matricula]) return;

            let $n1 = $line.querySelector('input[id^=n1_');
            let $n2 = $line.querySelector('input[id^=n2_');
            let $n3 = $line.querySelector('input[id^=n3_');
            let $final = $line.querySelector('input[id^=f_');
            $n1.value = map[matricula].n1;
            $n2.value = map[matricula].n2;
            $n3.value = map[matricula].n3;
            $final.value = map[matricula].final;
        });
    };

    function copy() {
        update(csv2json($ta.value));
    };

})();