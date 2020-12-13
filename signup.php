<?php
    require "header.php";
    require "loginDisallowed.php";
?>

    <main>
        <div class="wrapper">
            <h1 >Signup</h1>
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
                    <input type="text" name="username" placeholder="Username">
                    <input type="text" name="mail" placeholder="E-mail">
                    <input type="password" name="pwd" placeholder="Password">
                    <input type="password" name="pwd-repeat" placeholder="Repeat password">
                    <button type="submit" name="signup-submit">Signup</button>
                </form>
            </div>
        </div>
    </main>

<?php
    require "footer.php";
?>