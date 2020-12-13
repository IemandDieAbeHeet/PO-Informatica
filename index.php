<?php
include 'header.php';
require "loginDisallowed.php";

if(isset($_SESSION['userId'])) {
    header('Location: /PO-Informatica/lijsten');
}
?>

<main class="main">
    <header>
        <div>
            <h1>Wörterwelt</h1>
        </div>
        <nav>
            <a href="login">Inloggen</a>
            <a href="signup">Registreren</a>
        </nav>
    </header>
</main>

<?php
include 'footer.php';
?>