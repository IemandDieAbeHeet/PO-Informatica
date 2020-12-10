<?php
include 'header.php';

if(isset($_SESSION['userId'])) {
    header('Location: /PO-Informatica/lijsten');
}
?>

<main class="main">
    <header>
        <div>
            <h1>Wörterweltf</h1>
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