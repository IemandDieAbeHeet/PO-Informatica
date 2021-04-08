<?php
include 'defaultHeader.php';
require "loginDisallowed.php";

?>

<main class="main">
    <header class="indexHeader">
        <div id="logoDiv">
            <img id="indexLogo" src="img/Logo.png">
            <div><h1 style="color: orange">Wörter</h1><h1 style="color: white">welt</h1></div>
        </div>
        <nav class="indexNav">
            <button onclick="window.location.href='login.php'">Inloggen</button>
            <button onclick="window.location.href='signup.php'">Registreren</button>
        </nav>
    </header>
</main>

<?php
include 'defaultFooter.php';
?>