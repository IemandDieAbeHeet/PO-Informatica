<?php
    require "defaultHeader.php";
    require "loginDisallowed.php";
?>

    <main>
        <div class="wrapper">
            <div id="loginMenu">
                <h1 id="welcomeMessage">Welkom!</h1>
                <div class="outerBox">
                    <div class="box">
                        <img id="welkomLogo" src="img/Logo.png">
                    </div>
                    <div class="box">
                        <?php
                        if(isset($_GET["error"])) {
                            if($_GET["error"] == "emptyfields") {
                                echo '<p>Vul alle velden in!</p>';
                            }
                        }
                        else if(isset($_GET["login"])) {
                            if($_GET["login"] == "success") {
                                echo '<p>Login gelukt!</p>';
                            }
                        }
                        ?>
                        <form action="includes/login.inc.php" method="post" id="loginForm">
                            <input type="text" name="mailuid" placeholder="Gebruikersnaam/Email">
                            <input type="password" name="pwd" placeholder="Wachtwoord">
                            <button type="submit" name="login-submit">Inloggen</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>

<?php
    require "defaultFooter.php";
?>