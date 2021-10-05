var ImgName, ImgUrl;
var files = [];
var reader;

/*Firebase Configuration */
const firebaseConfig = {
    apiKey: "AIzaSyB_8KX1aeeYsQSlw_YC3C45-lt6Xi-Q598",
    authDomain: "skillbox-ab2f4.firebaseapp.com",
    databaseURL: "https://skillbox-ab2f4-default-rtdb.firebaseio.com",
    projectId: "skillbox-ab2f4",
    storageBucket: "skillbox-ab2f4.appspot.com",
    messagingSenderId: "380184603741",
    appId: "1:380184603741:web:acfe8fc7eebfaa0dbe31b4",
    measurementId: "G-9CXJTDKWHZ"
  };

//initialize Firebase
firebase.initializeApp(firebaseConfig)

//Select function, selecting image to upload

document.getElementById("select").onclick = function(e){

    var input = document.createElement('input');
    input.type = 'file';
    
    //opens up file explorer. 
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function(){
            document.getElementById("profileimg").src = reader.result;

        }
        reader.readAsDataURL(files[0]);
    }
    input.click();


}

//upload process
document.getElementById('upload').onclick = function(){
    ImgName = document.getElementById('namebox').value;
    var uploadTask = firebase.storage().ref('ProfilePics/'+ImgName+".png").put(files[0]);

    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('progressBar').innerHTML = 'upload'+progress+'%';
    
    
    },

    //error handling. 
    function(error){
        alert('error in saving image');

    },

    //store in database in a particular format
    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            ImgUrl = url;
        });

        firebase.database().ref('Pictures/'+ImgName).set({
            Name: ImagName,
            Link: ImgUrl
        });
    });
}