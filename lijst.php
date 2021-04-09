<?php
include 'defaultHeader.php';
include 'sidebar.php';
require "loginRequired.php";
?>

<main class="main-sidebar">
    <h1 id='paginaType'>Lijst</h1>
    <?php
    require "includes/dbh.inc.php";

    $sql = "SELECT * FROM woordjes WHERE woordenLijstId=?";
    $stmt = mysqli_stmt_init($conn);
    if(empty($_GET['woordenLijst'])) {
        header("Location: lijsten");
        exit();
    } else {
        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location: ../?error=sqlerror");
            exit();
        } else {
            $woordenLijstId = intval($_GET['woordenLijst']);
            mysqli_stmt_bind_param($stmt, "i", $woordenLijstId);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            if(mysqli_num_rows($result) > 0) {
                while($lijst = mysqli_fetch_assoc($result)) {
    ?>

        <div class='outerBox' id='lijstDiv'>
            <div id='lijstWoordenNaamDiv' class='box'>
                <p class="hidden lijstId"><?php echo $lijst['woordenLijstId']?></p>
                <h1 id="lijstNaam"><?php echo 'Naam: ' . $lijst['woordenLijstNaam'] ?></h1>
                
                <?php
                $woordenArray = json_decode($lijst['woordenArray']);
                ?>
                <div id="woordenLijstDiv">
                    <div>
                    <?php
                    for($i = 0; $i < count($woordenArray); $i++) {
                        ?>
                        <p><?php echo $woordenArray[$i][0]; ?></p>
                    <?php    
                        }
                    ?>
                    </div>
                    <div>
                    <?php
                    for($i = 0; $i < count($woordenArray); $i++) {
                        ?>
                        <p><?php echo $woordenArray[$i][1]; ?></p>
                    <?php    
                        }
                    ?>
                    </div>
                </div>
            </div>
            <div id="oefenSelection">
                <select name="oefentype" id="oefenSelection">
                    <option value="Toets">Toets</option>
                    <option value="Memory">Memory</option>
                    <option value="Galgje">Galgje</option>
                </select>
                <button type="submit" name="submit" id="oefenButton">Oefenen</button>
            </div>
        </div>

    <?php
                }
            }
        }
    }
    ?>
</main>

<?php
include 'defaultFooter.php';
?>