<section id="pageLoading" class="content app_page">
	<div class="row">
		<div class="col-lg-12">
			<div class="callout bg-aqua">
			    <h4>Autentiserer</h4>
			    <p>Vennligst vent...</p>

				<div class="progress">
			        <div id="authProgressBar" class="progress-bar progress-bar-light-blue" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><!-- updateProgress --></div>
			    </div>
			</div>

			<div id="authError" class="alert alert-danger hidden">
				<h4><i class="icon fa fa-ban"></i> Beklager!</h4>
				<p>
					<strong>Pålogging feilet fordi:</strong>
				</p>
				<div id="authErrorMsg">
					<!-- -->
				</div>
				<p>
					Dersom du mener dette dreier seg om en feil i tjenesten kan du fors&oslash;ke &aring; laste siden p&aring; nytt eller rapportere feilen til
					<a href="mailto:support@ecampus.no">support@ecampus.no</a>
				</p>
			</div>

			<div class="panel">
				<div class="panel-body">
					Tjenesten bruker <a href="http://www.dataporten.no" target="_blank">Dataporten fra UNINETT</a> for autentisering og dataflyt.
				</div>
			</div>
		</div>
	</div>
</section>
<!-- -->
<script src="app/js/etc/utils.js"></script>
<!-- JSO -->
<script src="app/js/auth/jso.js"></script>
<script src="app/js/auth/dataporten_auth.js"></script>

<script src="app/js/api_consumers/dataporten.js"></script>
<script src="app/js/api_consumers/mediasite.js"></script>
<script src="app/js/api_consumers/mediasite_org.js"></script>
<script src="app/js/api_consumers/mediasite_admin.js"></script>
<script src="app/js/api_consumers/kind.js"></script>