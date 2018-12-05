window.onload = function () {
  let showdata = document.getElementById('container');

  // deals with floats
  function strip(number) {
    return parseFloat(parseFloat(number).toPrecision(12))
  }

  function fact(n) {
    let f = 1;
    for (let i = 2; i <= n; i++) {
      f *= i;
    }
    return f;
  }

  function u_calc(u, n) {
    let tmp = u;
    for (let i = 1; i < n; i++) {
      tmp = tmp * (u - 1);
    }
    return tmp;
  }

  // let x = [0.5, 0.6, 0.7, 0.8, 0.9];
  // let y = [0.35207, 0.33322, 0.31225, 0.28969, 0.26609]
  let xuser = window.prompt('Set The Values of X');
  let x = JSON.parse('['+xuser+']');

  let yuser = window.prompt('Set The Values of Y');
  let y = JSON.parse('['+yuser+']');

  // let x = [50000, 75000, 100000, 125000, 150000];
  // let y = [412, 304, 225, 147, 88]

  let n = x.length;
  let table = [];
  for (let k = 0; k < y.length; k++) {
    table[k] = [y[k]];
  }

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n-j; i++) {
      table[i][j] = strip((table[i + 1][j - 1]) - (table[i][j - 1]));
    }
  }


  let str = '';
  // for (let i = 0; i < table.length; i++) {
  //   for (let j = 0; j < table[i].length; j++) {
  //     str += table[i][j];
  //     console.log(table[i][j])
  //   }
  //   str += '<br>'
  // }
  console.log(table)
  str += 'x = ' + JSON.stringify(x) + '<br>';
  str += 'y = ' + JSON.stringify(y) + '<br><br>';

  str += '--- Difference table --- <br>';

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      str += ' | ' + table[i][j] + ' | ';
    }
    str += '<br>'  
  }

  // Forward Interpolation
  let value = 60000;
  let u = strip((value - x[0]) / (x[1] - x[0]));
  
  let sum = table[0][0];
  for (let i = 1; i < n; i++) {
    sum = sum + (u_calc(u, i) * table[0][i]) / fact(i);
  }

  str += 'u = ' + u + '<br>'
  str += 'when value x is ' + value + ' the sum is ' + sum;


  showdata.innerHTML = str;

}