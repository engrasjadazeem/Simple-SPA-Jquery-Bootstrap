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
        var _hasPushed = false;

        //Traverse each word and fit it in row
        $.each(words, function (index, word) {
            if (word.length == 0) {
                //Empty words case
                words.pop(word);               
            } else {
                if (word.length <= remainingLength) {
                    remainingLength = remainingLength - (word.length + 1);
                    if (index == 0 || _hasPushed) {
                        row = word;
                        _hasPushed = false;
                    } else {
                        row = row + " " + word;
                    }
                } else {
                    //Row length fully utilized
                    remainingLength = rowLength;
                    rows.push(row);
                    _hasPushed = true;
                    row = "";
                }
            }

            if (index == (words.length - 1) && _hasPushed == false) {
                //Case to push the last string in row
                //console.log("Last push.")
                rows.push(row);
                _hasPushed = true;
            }
        });        

        //Joining rows for final result
        $.each(rows, function (index, row) {
            resultString += row + "<br />";            
        });

        //Append result
        $('#paragraph').append(resultString);
        $('#wordsCount').append("Words count: " + words.length);

        //console.log(rows);

    }, 'text');
});