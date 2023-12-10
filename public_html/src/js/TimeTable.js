
    var result;
    var valu;
    var key;
    function executeCode() {
      document.getElementById('loadingMsg').style.display = 'block'; // Отображение сообщения "Загрузка"
     // var app = "https://script.google.com/macros/s/AKfycbztXsH7tjAATvef9MCSwX-hTBXBDWGlWYdfl0qPKo2_J4HrAtDkNQdNzLhT-R-FZaDmyw/exec";
     var app = "https://script.google.com/macros/s/AKfycbwV2PVPR68BE19ELrEi7Swlh_u7uBbcB1BTvpim0T3gPE74zEFjrFAC5PLNNLm-hpIyAw/exec";
     var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var r = JSON.parse(xhr.responseText);
          var groupsArray = r["result"][0];
          var selfResult = r["result"];
          result = selfResult;
          var dictionary = {};
          for (var grpouID = 0; grpouID < groupsArray.length; grpouID++) {
            var word = groupsArray[grpouID];
            dictionary[word] = grpouID;
          }
          var selectDropdown = document.getElementById('selectKey');
          selectDropdown.innerHTML = '';

          // Создаем заглушку "Выберите группу"
          var placeholderOption = document.createElement('option');
          placeholderOption.disabled = true;
          placeholderOption.selected = true;
          placeholderOption.value = '';
          placeholderOption.text = 'Выберите группу';
          selectDropdown.appendChild(placeholderOption);
          Object.keys(dictionary).forEach(function (key) {
            var option = document.createElement('option');
            option.value = key;
            option.text = key;
            selectDropdown.appendChild(option);
            document.getElementById('loadingMsg').style.display = 'none'; // Скрытие сообщения "Загрузка" после обработки данных
            document.getElementById('selectKey').style.display = 'block'
            document.getElementById('myButton').style.display = 'block'
          });

          selectDropdown.addEventListener('change', function () {
            var selectedKey = selectDropdown.value;
            var selectedValue = dictionary[selectedKey];
            key = selectedKey;
            //console.log('Выбранный ключ:', selectedKey);
            //console.log('Значение ключа:', selectedValue);
            // Присваиваем значение ключа переменной
            var value = selectedValue;
            valu = parseInt(value)
            // document.getElementById('value').innerHTML = value;



          });
        }
      };

      xhr.open('GET', app);
      xhr.send();

    }

    function displayTable(result, valu, key) {

      var output = '';
      // for (var i = 0; i < result.length; i++){
      var obj = result[valu + 1];
      for (var j = 0; j < obj.length; j++) {
        var elements = obj[j];
        elements.type
        var day = '';
        day += "<span class = 'days' >" + elements[0] + "</span>";
        for (var t = 1; t < elements.length; t++) {
          day += "<br/>"
          if (elements.indexOf(elements[t]) % 2 != 0) {
            day += "<span class = 'days' >" + elements[t] + "</span>";
          }
          else {
            if (typeof elements[t] === "object" && elements[t].length > 0) {
              for (var str = 0; str < elements[t].length; str++) {
                var st = elements[t][str];
                if (st.includes("http")){
                  day += "Онлайн"+"<br/>";
                }
                else if( st.length > 0){
                day += "<span class = 'lessons' >" + st + "</span>";
                day += "<br/>";
                }
              }
            }


            if (elements[t] == "") {
              day += "———————————————";
            }
          }

        }
       
        if (j+1<obj.length){
        output += day + "<br/><hr/>";
       }
       else {
        output += day+ "<br/>";
       }
      }
      //   }
      
      document.getElementById('myButton').style.display = 'none';
      document.getElementById('back').style.display = 'block';
      document.getElementById('selectKey').style.display = 'none'
      document.getElementById('info').style.display = 'block'
      document.getElementById('value').innerHTML = key;
      document.getElementById('info').innerHTML = output;
    }

    document.addEventListener("DOMContentLoaded", function (event) {
      executeCode(); // Получение данных и заполнение выпадающего списка при загрузке страницы

      var myButton = document.getElementById('myButton');
      myButton.addEventListener('click', function () {
        // Получение выбранных данных из списка и передача их в displayTable()
        var selectedGroup = document.getElementById('selectKey').value;
        var selectedData = result;// Получение соответствующих данных из result
        displayTable(selectedData, valu, key);
      });
    });