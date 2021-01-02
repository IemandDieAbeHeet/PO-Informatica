<?php
    require "defaultHeader.php";
    require "loginDisallowed.php";
?>

    <main>
        <div class="wrapper">
            <h1>Inloggen</h1>
            <div class="login">
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
            <form action="includes/login.inc.php" method="post">
                <input type="text" name="mailuid" placeholder="Gebruikersnaam/Email">
                <input type="password" name="pwd" placeholder="Wachtwoord">
                <button type="submit" name="login-submit">Inloggen</button>
            </form>
            </div>
        </div>
    </main>

<?php
    require "defaultFooter.php";
?>