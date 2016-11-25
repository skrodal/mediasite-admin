<!-- Main content -->
    <section id="pageDashboard" class="content app_page hidden">

		<div class="jumbotron clearfix">
			<button type="button" class="btn bg-dark-gray icon ion-ios-information pull-right" data-toggle="modal" data-target="#infoDashModal"> Om&hellip;</button>
			<div class="container">
				<h1 class="icon ion-ios-pulse-strong text-nowrap"> <strong>Mediasite</strong>Admin</h1>
				<p class="text-muted">Statistikk og kostnadsestimator for din organisasjon.</p>
			</div>

			<div class="pull-right">
				<h2 class="text-muted"><span class="userFullName"><!--updateUserUI--></span></h2>
				<span class="label bg-orange icon ion-ios-home feideOrg"><!--updateUserUI--></span>
				<span class="label bg-orange feideAffiliation icon ion-university"><!--updateUserUI--></span>
				<span class="label bg-orange userRole icon ion-ios-star"><!--updateUserUI--></span>
			</div>
		</div>

	    <div class="dashInfoForAdmins"></div>

	    <h3>Oversikt</h3>
	    <div class="row">
			<div class="col-md-5">
				<!-- PRODUCT LIST -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-ios-list-outline"> Oppsummering</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div><!-- /.box-header -->

					<div class="box-body">
						<div class="info-box bg-light-blue">
							<span class="info-box-icon"><i class="icon ion-home"></i></span>
							<div class="info-box-content">
								<span class="info-box-text">Unike orgs</span>
								<h3><span class="orgCount"><!--updateUserUI--><i class="fa ion-load-d fa-spin"></i></span></h3>
							</div>
						</div>

						<div class="info-box bg-green">
							<span class="info-box-icon"><i class="icon ion-upload"></i></span>
							<div class="info-box-content">
								<span class="info-box-text">Lagring totalt</span>
								<h3 class="subscribersDiskusageTotal" class="info-box-number"><!--getTotalDiskusage--><i class="fa ion-load-d fa-spin"></i></h3>
							</div>
						</div>
                    </div><!-- /.box-body -->
                </div><!-- /.box -->



				<!-- Session info (DEV) -->
				<div class="box box-warning">
					<div class="box-header with-border">
						<h3 class="box-title ion-code-working"> Sesjonsinformasjon (fra Dataporten)</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<pre><code id="dataportenSessionInfo"></code></pre>
					</div><!-- /.box-body -->
				</div><!-- /.box -->


            </div><!-- /.col -->

            <div class="col-md-7">
	            <!-- PIE CHART -->
				<div class="box box-warning">
					<div class="box-header with-border">
						<h3 class="box-title ion-ios-pie"> Lagring fordelt på orgs (i TB)</h3>
					</div>
					<div class="box-body">
						<canvas id="pieOrgsDiskusageDashboard">
							<!--buildDashboardOrgsDiskusagePie-->
							<div class="overlay ajax">
								<i class="fa ion-load-d fa-spin"></i>
							</div>
						</canvas>

						<p>
							<code class="feideOrg"></code> har brukt <code class="homeOrgDiskusage"></code>.
						</p>
					</div><!-- /.box-body -->
					<div class="box-footer">
						<span class="text-muted icon ion-ios-information">&nbsp;
							<small>
								Data er anonymifisert
							</small>
						</span>
					</div><!-- /.box-footer -->
				</div><!-- /.box -->


        </div><!-- /.row -->


		<!-- INFO MODAL -->
		<div class="modal fade" id="infoDashModal" tabindex="-1" role="dialog" aria-labelledby="modalInfoTitle" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header bg-dark-gray">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;&nbsp;&nbsp;<span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="modalInfoTitle">Om MediasiteAdmin</h4>
					</div>

					<div class="modal-body">
						<p>
							MediasiteAdmin er et supplement til Mediasite Management Portal. Tilgang er begrenset til Mediasite administratorer.
						</p>
						<p>
							Tjenestens form&aring;l er &aring; gi abonnenten en oversikt over diskforbruk samt gi et <i>estimat</i> p&aring; kostnader
							forbundet med dette. Vi h&aring;per dette bidrar til bedre forutsigbarhet ifm. planlegging/budsjett/fakturering.
						</p>
						<p>
							Tjenesten gir i tillegg innsikt i hvem som abonnerer p&aring; tjenesten samt global statistikk p&aring; tvers av disse.
						</p>
					</div>

					<div class="modal-footer bg-dark-gray">
						<span class="pull-left" style="line-height: 34px;">
							Utviklet og levert av<a href="http://www.uninett.no" class="logo"><img src="dist/AdminLTE/img/UNINETT_logo_dark_gray.svg" alt="UNINETT AS" style="vertical-align:middle; height: 18px;" type="image/svg+xml"></a>
						</span>
						<button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
					</div>
				</div>
			</div>
		</div>
		<!-- //.modal -->

    </section>

  <script src="app/js/page_dashboard.js" type="text/javascript"></script>