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
								Abonnenter: <span class="subscribersCount"><!--updateUserUI--><i class="fa ion-load-d fa-spin"></i></span><br>
								Utprøving: <span class="subscribersTrialCount"><!--updateUserUI--><i class="fa ion-load-d fa-spin"></i></span><br>
								Andre: <span class="subscribersOtherCount"><!--updateUserUI--><i class="fa ion-load-d fa-spin"></i></span><br>
								Totalt: <span class="subscribersTotalCount"><!--updateUserUI--><i class="fa ion-load-d fa-spin"></i></span>
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

				<!-- PIE CHART -->
				<div class="box box-warning">
					<div class="box-header with-border">
						<h3 class="box-title ion-ios-pie"> Lagring fordelt p&aring; abonnenter (i TB)</h3>
					</div>
					<div class="box-body">
						<canvas id="chartOrgsDiskusageDashboard">
							<!--buildDashboardOrgsDiskusagePie-->
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
				<!-- TABLE: SUBSCRIBERS -->
				<div id="subscribersTableBoxDashboard" class="box box-info">
					<div class="box-header with-border">
						<h3 class="box-title ion-ios-home"> Abonnenter</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool icon ion-ios-information" style="margin-right: 15px;" data-toggle="modal" data-target="#subscriptionInfoDashModal">&nbsp;info&hellip;</button>
							<span data-toggle="tooltip" title="Totalt" class="badge bg-blue subscribersTotalCount"><!--updateUserUI--></span>
							<span data-toggle="tooltip" title="Aktive" class="badge bg-green subscribersCount"><!--updateUserUI--></span>
							<span data-toggle="tooltip" title="Utpr&oslash;ving" class="badge bg-orange subscribersTrialCount"><!--updateUserUI--></span>
							<span data-toggle="tooltip" title="Andre" class="badge bg-red subscribersOtherCount"><!--updateUserUI--></span>
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>

					<div class="box-body">
						<div id="subscribers_table_dash" class="table-responsive">
							<table class="table no-margin">
								<thead>
									<tr>
										<th>Org</th>
										<th style="text-align: center;">Status</th>
									</tr>
								</thead>
								<tbody id="subscriber_table_body">
									<!--buildOrgsTableDashboard-->
								</tbody>
							</table>
						</div><!-- /.table-responsive -->
					</div><!-- /.box-body -->

					<div class="box-footer text-muted">
						<small><i class="icon ion-ios-information"></i> Abonnementsinformasjon hentet live fra UNINETTs driftsdatabase ('KIND').</small>
					</div>

					<div class="overlay ajax">
						<i class="fa ion-load-d fa-spin"></i>
					</div>
				</div><!-- /.box -->
            </div><!-- /.col -->

        </div><!-- /.row -->



	    <!-- SUBSCRIPTION INFO MODAL -->
		<div id="subscriptionInfoDashModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalSubscriptionInfoTitle" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header bg-dark-gray">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;&nbsp;&nbsp;<span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="modalInfoTitle">Status abonnement</h4>
					</div>
					<div class="modal-body">
						<div class="list-group">
							<div class="list-group-item bg-green">
								<h4 class="list-group-item-heading">Abonnent</h4>
								<p class="list-group-item-text">Avtaleverk signert</p>
							</div>

							<div class="list-group-item bg-orange">
								<h4 class="list-group-item-heading">Utpr&oslash;ving</h4>
								<p class="list-group-item-text">Mangler avtaleverk - &aring;pnet for testing i en tidsbegrenset periode</p>
							</div>

							<div class="list-group-item bg-red">
								<h4 class="list-group-item-heading">Andre</h4>
								<p class="list-group-item-text">Mangler avtaleverk - abonnement/utpr&oslash;ving avsluttet, eller org funsjonert</p>
							</div>
						</div>
					</div>
					<div class="modal-footer bg-dark-gray">
						<button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
					</div>
				</div>
			</div>
		</div>

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