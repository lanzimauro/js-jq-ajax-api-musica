$(document).ready(function () {
    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);

    $('.selettore-genere').change(function () {
        var genereSelezionato = $(this).val();
        console.log(genereSelezionato);

        if (genereSelezionato == "") {
            $('.card').show();
        } else {
            $('.card').each(function(){
                if(genereSelezionato.toLowerCase() == $(this).data('genere').toLowerCase()) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });



    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function (data) {
            console.log(data);

            var albums = data.response;
            for (var i = 0; i < albums.length; i++) {
                var album = albums[i];
                console.log(album);
                var albumTemplate = {
                    immagineAlbum: album.poster,
                    nomeAlbum: album.title,
                    autore: album.author,
                    anno: album.year,
                    genere: album.genre
                }
                var cardAlbum = cardTemplate(albumTemplate);
                $('.container-card').append(cardAlbum);
            }
        },
        error: function () {
            alert('BOOM');
        }
    })




});
