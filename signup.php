<?php
    require "defaultHeader.php";
    require "loginDisallowed.php";
?>

    <main>
        <div class="wrapper">
            <div id='signupMenu'>
                <h1 id='welcomeMessage'>Registratie</h1>
                <div class="outerBox signupOuterBox">
                    <div class="box signupBox">
                        <img id="welkomLogoSignup" src="img/Logo.png">
                    </div>
                    <div class='box signupBox' id='signupFormDiv'>
                        <?php
                        if(isset($_GET["error"])) {
                            if($_GET["error"] == "emptyfields") {
                                echo '<p>Vul alle velden in!</p>';
                            }
                        }
                        else if(isset($_GET["signup"])) {
                            if($_GET["signup"] == "success") {
                                echo '<p>Aanmelding gelukt!</p>';
                            }
                        }
                        ?>
                        <form id='signupForm' action="includes/signup.inc.php" method="post">
                            <input type="text" name="username" placeholder="Gebruikersnaam">
                            <input type="text" name="volledigenaam" placeholder="Volledige naam">
                            <input type="text" name="mail" placeholder="E-mail">
                            <input type="password" name="pwd" placeholder="Wachtwoord">
                            <input type="password" name="pwd-repeat" placeholder="Wachtwoord herhalen">
                            <div id='algemeneVoorwaardenDiv'>
                                <p>Ik ga akkoord met de <a href="algemenevoorwaarden.php">Algemene voorwaarden</a></p>
                                <input id="algemeneVoorwaarden" type="checkbox">
                            </div>
                            <button type="submit" id="signupSubmit" name="signup-submit">Aanmelden</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>

<?php
    require "defaultFooter.php";
?>