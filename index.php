<?php
include 'header.php';

if(isset($_SESSION['userId'])) {
    header('Location: /PO-Informatica/lijsten');
}
?>

<main class="main">
    <header>
                <nav>
                    <a href="login">Inloggen</a>
                    <a href="signup">Registreren</a>
                </nav>
    </header>
</main>

<?php
include 'footer.php';
?>