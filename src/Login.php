<?php
	  session_start();

// Συνδέεται στη βάση δεδομένων
  $servername = "localhost";
  $username = "phpmyadmin";
  $password = "aekoriginal21";
  $dbname = "user";

  $conn = mysqli_connect($servername, $username, $password, $dbname);
  if (!$conn) {
    die("Αποτυχία σύνδεσης: " . mysqli_connect_error());
  }



if($_SERVER['REQUEST_METHOD'] == 'POST') {
  $Username = $_POST['Username'];
  $Password = $_POST['Password'];
  
  $sql = "SELECT * FROM signup WHERE Username = '$Username' AND Password = '$Password'";
  $result = mysqli_query($conn, $sql);
  
   if(mysqli_num_rows($result) == 1) {
    $_SESSION['Username'] = $Username; 
	$_SESSION['Password'] = $Password;
    header('Location: profile.php');
    exit();
  } else {
    $error = 'Λάθος όνομα χρήστη ή κωδικός πρόσβασης.';
  }
}

?>


<html>
  <head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
	.dark-mode .navmenu ul li a {
  color: #fff;
}

.dark-mode .navmenu ul li a:before {
  background: #fff;
}
	.container {
		width: 100%;
		min-height: 100vh;
		background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
			url(images/signup.jpg);
		background-size: cover;
		background-position: center;
		position: relative;
	}
	.dark-mode .navmenu li:hover ul {
		background-color:black;
	}
	
    .navmenu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: right; 
  }
    .navmenu ul li {
        display: inline-block;
        position: relative;
    left:-40px;
	}
    .navmenu ul li a {
        display: block;
        color: #222;
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        padding: 10px;
        transition: .3s;
        -webkit-transition: all 0.5s ease 0s;
        text-decoration: none;
    }
    .navmenu ul li a:before {
		position: absolute;
		bottom: 0;
		content: "";
		width: 100%;
		height: 3px;
		background: #11d117;
		left: 0;
		opacity: 0;
		transition: 0.3s;
		-webkit-transition: all 0.5s ease 0s;
		visibility: hidden;
	}
    .navmenu ul li:hover > a:before, .navmenu ul li.active > a:before {
        opacity: 1;
        visibility: visible;
    }
   .navmenu ul li:hover > a,
	.navmenu ul li.active > a {
		background: #f4f4f4;
		text-decoration: none;
		color: #11d117;
	}
    .navmenu li ul {
        background: #fff none repeat scroll 0 0;
        left: 0;
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        position: absolute;
        text-align: left;
        top: 108px;
        -webkit-transition: all 0.5s ease 0s;
        transition: all 0.5s ease 0s;
        visibility: hidden;
        width: 200px;
        z-index: -1;
    }
    .navmenu li ul li {
        display: block;
    }
    .navmenu li ul li a {
        padding-bottom: 5px;
        text-transform: none;
    }
    .navmenu li:hover ul {
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        visibility: visible;
        z-index: 99;
        top: 40px;
		padding-left:40px;	
    }
	body{
		margin:0;
		padding:0;
		font-family:sans-serif;
		background-image: url(images/signup.jpg);
		background-size:cover;
		background-position:center;
	}
	.sign-in-form{
		width:300px;
		box-shadow:0 0 3px 0 rgba(0,0,0,0.3);
		background:#fff;
		padding:20px;
		margin:8% auto;
		text-align:center;
	}
	.sign-in-form h1{
		color: #1c8adb;
		margin-bottom:30px;
	}
	.input-box{
		border-radius:20px;
		padding:10px;
		margin:10px 0;
		width:100%;
		border:1px solid #999;
		outline:none;
	}
	button{
		color:#fff;
		width:100%;
		padding:10px;
		border-radius:20px;
		font-size:15px;
		margin:10px 0;
		border:none;
		outline:none;
		cursor:pointer;
	}
	.signup-btn{
		background-color: #1c8adb;
	}
	.social-btn{
		background-color: #21afde;
	}
	a{
		text-decoration:none;
	}
	hr{
		margin-top:20px;
		width:80%;
	}
	
	#signupicon{
		width:70px;
		margin-top:-50px;
	}
	
	#icon {
		width: 30px;
		cursor: pointer;
		position: absolute;
		top: 0px;
		right: 8px;
		z-index: 2;
	}
	.dark-mode .container {
		background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
			url(images/signup.jpg);
	}
	.dark-mode .sign-in-form{
		background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
			url(images/signup.jpg);
	}
	.dark-mode body{
		background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
			url(images/signup.jpg);
	}
	
	.dark-mode .sign-in-form *{
  color: #fff;
}
.fade-in {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

.page-transition-link {
  transition: color 0.3s ease-in;
}

.page-transition-link:hover {
  color: red;
}
	input[type="checkbox"]{
		cursor:pointer;
	}
	.dark-mode input[type="password"]{
		text-decoration: none;
  color: #008CBA;
	}
	.dark-mode input[type="text"]{
		text-decoration: none;
  color: black;
	}
	
</style>
	</head>
  <body>
	  
	  <img src="images/moon.png" id="icon">
	  <div class="container">
<div class="navmenu">

	<ul>
		<li><a href="home.html"class="page-transition-link">Home</a></li>
		<li><a href="QnA.php"class="page-transition-link">Q&A</a>
		<ul>
			<li><a href="search.php">Search Bar</a></li>
				<li><a href="question.php">Insert Questions</a></li>
			</ul>
		</li>
		<li><a href="signup.php"class="page-transition-link">Sign up <i class="fa fa-long-arrow-down"></i></a>
		</li>
		<li class="active"><a href="login.php">Sign in </a></li>
		<li><a href="profile.php"class="page-transition-link">profile</a>
			<ul>
			<li><a href="edit_profile.php">Επεξεργασία Προφίλ</a></li>
						<li><a href="logout.php">Αποσύνδεση</a></li>
				</ul>	
        </li>
		<li><a href="help.html"class="page-transition-link">Help</a></li>
	</ul>
</div>
	  <div class="sign-in-form">
		<img src="images/signupicon.png" id="signupicon">
    <h1>Σύνδεση</h1>
    <form action="login.php" method="post">
      <input type="text" id="Username" class="input-box" name="Username" required placeholder="Your username"><br>
			<input type="password" class="input-box" name="Password" placeholder="Your Password">
			<p><span><input type="checkbox"></span>
				Συμφωνώ με τους Όρους Παροχής Υπηρεσιών
			</p>
			<button type="submit" class="signup-btn">Συνδεθείτε</button>
			<hr>
			<p>
				Δεν έχετε λογαριασμό? <a href="signup.php">Κάντε εγγραφή εδώ</a>
			</p>
		</form>
	  </div>
	  </div>
	  <script>
		// Get the current value of the "darkMode" cookie
		var darkModeCookie = document.cookie.replace(/(?:(?:^|.*;\s*)darkMode\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		// If the "darkMode" cookie is set to "true", enable dark mode by default
		if (darkModeCookie === "true") {
			document.body.classList.add("dark-mode");
			document.getElementById("icon").src = "images/sun.png";
		}

		var icon = document.getElementById("icon");

		icon.onclick = function () {
			document.body.classList.toggle("dark-mode");

			if (document.body.classList.contains("dark-mode")) {
				icon.src = "images/sun.png";
				// Set the "darkMode" cookie to "true" when dark mode is enabled
				document.cookie = "darkMode=true; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/";
			} else {
				icon.src = "images/moon.png";
				// Set the "darkMode" cookie to "false" when dark mode is disabled
				document.cookie = "darkMode=false; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/";
			}
		}
	</script>
	  <script>document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.page-transition-link');
  
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const href = this.getAttribute('href');
      document.body.classList.add('fade-in');
      setTimeout(function() {
        window.location.href = href;
      }, 300);
    });
  });
});</script>

  </body>
</html>