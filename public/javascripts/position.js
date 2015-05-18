// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the table on initial page load
    populateTable();

    // Symbol link click
    $('#positionList table tbody').on('click', 'td a.linkshowuser', showDealInfoList);

//    setupSocket();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/position/positionlist', function(data) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this._id + '" title="Show Details">' + this._id + '</a></td>';
            tableContent += '<td>' + this.count + '</td>';
            tableContent += '<td>' + this.Total_Price + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#positionList table tbody').html(tableContent);
    });
};

// Show User Info
function showDealInfoList(event) {

    // Empty content string
    var tableContent = '';

    // Retrieve symbol from link rel attribute
    var thisSymbol = $(this).attr('rel');

    // jQuery AJAX call for JSON. This should get all deals matching thisSymbol
    $.getJSON('/dealsforsymbol/dealsforsymbol', {
        Symbol: thisSymbol
    }, function(data) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function() {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.OrderID + '" title="Show Details">' + this.OrderID + '</a></td>';
            tableContent += '<td>' + this.LoginID + '</td>';
            tableContent += '<td>' + this.Symbol + '</td>';
            tableContent += '<td>' + this.Type + '</td>';
            tableContent += '<td>' + this.Volume + '</td>';
            tableContent += '<td>' + this.ClosePrice + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#dealInfoList table tbody').html(tableContent);
    });

};

function setupSocket() {

        // // Use anything defined in the loaded script...
        // var socket = io.connect('https://wbsckts-mcdg.c9.io/');
        // // on every message recived we print the new datas inside the #container div
        // socket.on('notification', function(data) {
        //     // convert the json string into a valid javascript object
        //     var _data = JSON.parse(data);
        //     console.log("received notification");

        //     $('#container').html(_data);
        //     $('#container').html("abcd");
        // });
}