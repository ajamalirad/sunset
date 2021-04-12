$('.locate').on('click', function(){

    if('geolocation' in navigator) {
        console.log('geolocation is available'); 
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position.coords.latitude);
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lng;
            $('.location').removeClass('hidden');

            const app = {};

            app.getSunset = function(){
                $.ajax({
                    url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`,
                    method: 'GET',
                    dataType: 'JSON',
                }).then(function(result){
                    //display data
                    // console.log(result);
                    // get sunset data only 
                    // console.log(result.results.sunset);
                    //display sunset data on browser
                    $('.results').empty();
                    const html = `
                    <div class="sunset">
                        <p>Sunset is at ${result.results.sunset} UTC</p>
                    </div>
                    `
                    $('.results').append(html);
                    
                }).fail(function(error){
                    console.log(error);
                });
            };

            app.init = function(){
                $('.sunset-time').on('click', function(){
                    app.getSunset();
                });
            };

            $(document).ready(function(){
                app.init();
            });


});
} else {
    console.log('geolocation is NOT available'); 
};
});



