<?php
	date_default_timezone_set('CET');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>MediasiteAdmin</title>
		<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes' name='viewport'>
		<!-- Stylesheets -->
		<link href="dist/AdminLTE/fonts/fontawesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
		<link href="dist/AdminLTE/fonts/ionicons/ionicons.min.css" rel="stylesheet" type="text/css"/>
		<link href="dist/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
		<link href="dist/AdminLTE/css/AdminLTE.min.css" rel="stylesheet" type="text/css"/>
		<link href="dist/AdminLTE/css/skins/skin-black.min.css" rel="stylesheet" type="text/css"/>
		<link href="dist/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css"/>
		<link href="dist/plugins/datatables/tabletools/css/dataTables.tableTools.min.css" rel="stylesheet" type="text/css"/>
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->

		<!-- jQuery -->
		<script src="dist/plugins/jQuery/jQuery-2.1.3.min.js"></script>
		<!-- Bootstrap 3.3.2 JS -->
		<script src="dist/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
		<!-- AdminLTE App -->
		<script src="dist/AdminLTE/js/app.min.js" type="text/javascript"></script>
		<!-- For fixed sidebar layout -->
		<script src="dist/plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	</head>

	<body class="skin-black fixed">
		<div class="wrapper">
			<!-- Main Header -->
			<?php include_once('app/pages/index_header.php'); ?>
			<!-- Left side column. contains the logo and sidebar -->
			<?php include_once('app/pages/index_sidebar.php'); ?>
			<!-- Content Wrapper. Contains page content -->
			<div class="content-wrapper">
				<?php
					// Pull in all pages
					include_once('app/pages/page_loading.php');
					include_once('app/pages/page_dashboard.php');
					include_once('app/pages/page_org_admin.php');
					include_once('app/pages/page_super_admin.php');
				?>
			</div><!-- /.content-wrapper -->

			<!-- Main Footer -->
			<?php include_once('app/pages/index_footer.php'); ?>
		</div><!-- ./wrapper -->

		<!-- ERROR MODAL -->
        <div id="error_modal" class="modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-yellow-active">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                <h4 id="title" class="modal-title"></h4>
              </div>
              <div id="message" class="modal-body">
              </div>
              <div class="modal-footer bg-yellow-active">
                <button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

		<!-- Reduces response time on click on touch-devices -->
		<script src="dist/plugins/fastclick/fastclick.min.js" type="text/javascript"></script>
		<!-- DataTables -->
		<script src="dist/plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
		<script src="dist/plugins/datatables/dataTables.bootstrap.js" type="text/javascript"></script>
		<script src="dist/plugins/datatables/tabletools/js/dataTables.tableTools.min.js" type="text/javascript"></script>
		<!-- Chart.js -->
		<script src="dist/plugins/chartjs/Chart.min.js" type="text/javascript"></script>
		<!-- MediasiteAdmin, the bulks of scripts are loaded in page_loading.php -->
		<script src="app/js/app.js" type="text/javascript"></script>
		<script src="app/js/etc/defaults.js" type="text/javascript"></script>
	</body>
</html>

