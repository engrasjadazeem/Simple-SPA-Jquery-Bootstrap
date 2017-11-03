//Load Word.txt file from *nix web
$(document).ready(function () {
    $.get('https://raw.githubusercontent.com/eneko/data-repository/master/data/words.txt', function (data) {

        //console.log(data);
        var words = data.split('\n');
        var rows = [];
        var rowLength = 100;
        var remainingLength = rowLength;
        var row = "";
        var resultString = "";

        //Traverse each word and fit it in row
        $.each(words, function (index, word) {
            if(word.length <= remainingLength){
                remainingLength = remainingLength - (word.length + 1);
                if (index == 0) {
                    row = word;
                } else {
                    row = row + " " + word;
                }
            } else {
                //Row length fully utilized
                remainingLength = rowLength;
                rows.push(row);
                row = "";
            }
        });        

        //Joining rows for final result
        $.each(rows, function (index, row) {
            resultString += row + "<br />";            
        });

        //Append result
        $('#paragraph').append(resultString);

        //console.log(rows);

    }, 'text');
});