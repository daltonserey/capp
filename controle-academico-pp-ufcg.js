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
        console.log('não é página de edição de notas...');
        return;
    };

    // localiza tabela de notas
    let $table = document.querySelector('table');

    // adiciona textarea do csv
    let $csv = document.createElement('textarea');
    $csv.placeholder = 'copie e cole seu CSV aqui (matrícula, nota1, nota2, nota3, final)';
    $csv.style.width = '100%';
    $csv.style.height = '10em';
    $csv.style.fontFamily = 'monospace';
    $table.parentElement.insertBefore($csv, $table);

    // adiciona button
    let $button = document.createElement('button');
    $button.setAttribute('type', 'button');
    $button.classList.add('btn');
    $button.classList.add('btn-success');
    $button.innerText = 'Copiar para o diário de classe';
    $button.addEventListener('click', do_it);
    $table.parentElement.insertBefore($button, $table);

    function copy2table(data) {
        let $table = document.querySelector('table');

        let lines = $table.querySelectorAll('tr');
        lines.forEach(($line, i) => {
            if (i == 0) return; // pula linha de headers
            let matricula = $line.querySelectorAll('td')[1].innerText;
            if (!data[matricula]) return; // matricula não encontrada nos dados

            // transcreve notas
            for (let i=1; i <= numNotas(); i++) {
                let $input_nota = $line.querySelector(`input[id^=n${i}_`);
                $input_nota.value = data[matricula][`nota${i}`] ? Number(data[matricula][`nota${i}`]).toFixed(1): '';
            }

            // transcreve final
            let $nota_final = $line.querySelector('input[id^=f_');
            $nota_final.value = data[matricula].final;
        });
    };

    function csv2array(csv) {
        let lines = csv.match(/[^\r\n]+/g);
        if (!lines) return [];
        lines.forEach((line, i) => {
            lines[i] = line.split(",");
        });
        return lines;
    };

    function numNotas() {
        return Number(document.querySelector('#numNotas').value);
    }

    function record(line) {
        let rec = { matricula: line[0] };
        for (let i=1; i<=numNotas(); i++){
            rec[`nota${i}`] = line[i] || '';
        }

        if (line.length === numNotas() + 2) {
            rec.final = line[line.length - 1];
        }
        else if (line.length > numNotas() + 2) {
            console.log('Alguns dados da linha serão ignorados');
            console.log(line);
            rec.final = "";
        } else {
            console.log('Faltam dados na linha');
            console.log(line);
            rec.final = "";
        }
        return rec;
    }

    function do_it() {
        let data = csv2array($csv.value)
                   .map(line => record(line))
                   .reduce((mapa, r) => {mapa[r.matricula] = r; return mapa}, {});
        copy2table(data);
    };

    window.do_it = do_it;
    window.numNotas = numNotas;
    window.csv2array = csv2array;
    window.record = record;
    window.copy2table = copy2table;

})();