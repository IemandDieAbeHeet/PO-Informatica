<?php
include 'header.php';

if(isset($_SESSION['userId'])) {
    header('Location: lijsten.php');
}
?>

<main class="main">
    <header>
                <nav>
                    <a href="login.php">Inloggen</a>
                    <a href="signup.php">Registreren</a>
                </nav>
    </header>
</main>

<?php
include 'footer.php';
?>