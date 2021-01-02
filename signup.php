<?php
    require "defaultHeader.php";
    require "loginDisallowed.php";
?>

    <main>
        <div class="wrapper">
            <h1 >Aanmelden</h1>
            <div class="signup">
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
                <form action="includes/signup.inc.php" method="post">
                    <input type="text" name="username" placeholder="Gebruikersnaam">
                    <input type="text" name="volledigenaam" placeholder="Volledige naam">
                    <input type="text" name="mail" placeholder="E-mail">
                    <input type="password" name="pwd" placeholder="Wachtwoord">
                    <input type="password" name="pwd-repeat" placeholder="Wachtwoord herhalen">
                    <button type="submit" name="signup-submit">Aanmelden</button>
                </form>
            </div>
        </div>
    </main>

<?php
    require "defaultFooter.php";
?>