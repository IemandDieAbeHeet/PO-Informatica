<?php
    session_start();

    require "includes/dbh.inc.php";

    $sql = "SELECT * FROM klassen WHERE klasDocentId=?";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: /?error=sqlerror");
        exit();
    } else {
        $userId = $_SESSION['userId'];
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if(mysqli_num_rows($result) > 0) {
            while($lijst = mysqli_fetch_assoc($result)) {
    ?>

        <li class="klasDiv">
            <p class="hidden klasId"><?php echo $lijst['klasId']?></p>
            <p><?php echo 'Klas: ' . $lijst['klasNaam'] ?></p>
            <button class="klasBekijkButton">Klas bekijken</button>
            <button class="klasDeleteButton">Klas verwijderen</button>
            <?php
            if($_SESSION['userType'] == "Leraar") {
            ?>
            <button class="editKlasOpenButton">Klas bewerken</button>
            <div class="editKlasDiv" style="display: none">
                <form id="editKlasForm">
                    <input type="text" id="klasNaam" name="klasNaam" placeholder="Naam">
                    <select name="klasNiveau" id="klasNiveau">
                        <option value="VWO">VWO</option>
                        <option value="HAVO">HAVO</option>
                    </select>
                    <input type="number" id="klasJaar" name="klasJaar" placeholder="Jaar" min='0' max='6'>
                    <button type="submit" name="editKlasSubmit" form='editKlasForm'>Deze werkt nog niet :(</button>
                </form>
                <button class="editKlasCollapseButton">X</button>
            </div>
            <?php
            }
            ?>
        </li>

    <?php
            }
        }
    }
?>