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
        var wordCount = 0;
        //Traverse each word and fit it in row
        $.each(words, function (index, word) {
            if (word.length != 0) {                                
                if ((word.length + 1) <= remainingLength) {
                    wordCount++;
                    remainingLength = remainingLength - (word.length + 1);
                    if (index == 0) {
                        row = word;                        
                    } else {
                        row = row + " " + word;
                    }
                    _hasPushed = false;
                } else {
                    //Row length fully utilized
                    remainingLength = rowLength;
                    rows.push(row);
                    _hasPushed = true;
                    //Joining rows for final result
                    resultString += row + "<br />";

                    //Initialize row with the word
                    remainingLength = remainingLength - (word.length + 1);
                    row = word;
                    wordCount++;
                }
            }

            if (index == (words.length - 1) && _hasPushed == false) {
                //Case to push the last string in row
                //console.log("Last push.")
                rows.push(row);
                //Joining rows for final result
                resultString += row + "<br />";
                _hasPushed = true;
            }
        });        

        //Append result
        $('#paragraph').append(resultString);
        $('#wordsCount').append("Words count: " + wordCount);

        //console.log(rows);

    }, 'text');
});