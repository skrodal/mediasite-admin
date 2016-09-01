<!-- Main content -->
    <section id="pageSuperAdmin" class="content app_page hidden">
		<div class="jumbotron clearfix">
			<div class="container">
				<h1 class="icon ion-ios-star text-nowrap"> <strong>Super</strong>Admin</h1>
				<p class="text-muted">Infoside for UNINETT internt.</p>
			</div>

			<div class="pull-right">
				<h2 class="text-muted"><span class="userFullName"><!--updateUserUI--></span></h2>
				<span class="label bg-orange icon ion-ios-home feideOrg"><!--updateUserUI--></span>
				<span class="label bg-orange feideAffiliation icon ion-university"><!--updateUserUI--></span>
				<span class="label bg-orange userRole icon ion-ios-star"><!--updateUserUI--></span>
			</div>
		</div>

		<h2 class="page-header">Globale tall</h2>

		<div class="row">
			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-aqua"><i class="ion ion-university"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">ABONNENTER</span>
						<span class="info-box-number subscribersCount"><!-- --></span>
						<div class="progress bg-aqua"></div>
						<span class="progress-description text-muted">Fullverdige</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->

			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-red"><i class="ion ion-upload"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">LAGRING</span>
						<span class="info-box-number subscribersDiskusageTotal"><!-- --></span>
						<div class="progress bg-red"></div>
						<span class="progress-description text-muted">Akkurat n&aring;</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->

			      <!-- fix for small devices only -->
			<div class="clearfix visible-sm-block"></div>

			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-yellow"><i class="ion ion-android-calendar"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">SNITT</span>
						<span class="info-box-number subscribersDiskusageAvgThisYear"><!-- --></span>
						<div class="progress bg-yellow"></div>
						<span class="progress-description text-muted">For dette &aring;r</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->

			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-green"><i class="fa fa-money"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">FAKTURERBART</span>
						<span class="info-box-number description-header totalAvgStorageCostEstimate"><!-- --></span>
						<div class="progress bg-green"></div>
						<span class="progress-description text-muted">Estimat</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->
		</div>

		<h2 class="page-header">Abonnenter og kontaktpunkt</h2>

	    <div class="row">
		    <div class="col-lg-12">
				<!-- SUBSCRIBERS TABLE -->
				<div id="subscribersTableBoxSuperAdmin" class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-ios-home"> Abonnenter</h3>
						<div class="box-tools pull-right">
							<!-- Modal with info about different subscription codes-->
							<button class="btn btn-box-tool icon ion-ios-information" style="margin-right: 15px;" data-toggle="modal" data-target="#subscriptionStatusInfoModal">&nbsp;info&hellip;</button>
							<span data-toggle="tooltip" title="Totalt" class="badge bg-blue subscribersTotalCount"><!--updateUserUI--></span>
							<span data-toggle="tooltip" title="Aktive" class="badge bg-green subscribersCount"><!--updateUserUI--></span>
							<span data-toggle="tooltip" title="Utpr&oslash;ving" class="badge bg-orange subscribersTrialCount"><!--updateUserUI--></span>
							<span data-toggle="tooltip" title="Andre" class="badge bg-red subscribersOtherCount"><!--updateUserUI--></span>
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body table-responsive">

						<div class="info-box">
							<span class="info-box-icon bg-blue-active"><i class="ion ion-ios-home"></i></span>
							<div class="info-box-content">
								<ul>
									<li><span class="subscribersTotalCount"></span> abonnenter funnet i Kind.</li>
									<li><span class="foldersWithNoKindSubscriptionTotalCount"></span> mapper på disk uten match på org i Kind <span class="text-muted">(disse har status som <code>ukjent</code> i tabellen)</span>.</li>
									<li>Lagring/kostnad er basert på snittverdier for <?php echo date("Y"); ?> <span class="text-muted">(lagring * pris per TB)</span>.</li>

								</ul>
							</div><!-- /.info-box-content -->
						</div>

						<table id="subscribersTableSuperAdmin" class="table table-bordered table-striped table-hover" style="width: 100%; font-size: 13px;">
	                        <thead class="text-muted">
	                            <tr>
	                                <th class="text-nowrap"><i class="icon ion-android-home"></i> Org</th>
	                                <th class="text-nowrap"><i class="icon ion-android-person"></i> Kontakt</th>
	                                <th class="text-nowrap"><i class="icon ion-help-buoy"></i> Support</th>
	                                <th class="text-nowrap"><i class="icon ion-upload"></i> Lagring (TB)</th>
	                                <th class="text-nowrap"><i class="icon ion-cash"></i> Kostnad (kr)</th>
		                            <th class="text-nowrap"><i class="icon ion-key"></i> Status</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <!-- AJAX/DataTables -->
	                        </tbody>
	                        <tfoot class="text-muted">
	                            <tr>
	                                <th class="text-nowrap"><i class="icon ion-android-home"></i> Org</th>
	                                <th class="text-nowrap"><i class="icon ion-android-person"></i> Kontakt</th>
	                                <th class="text-nowrap"><i class="icon ion-help-buoy"></i> Support</th>
		                            <th class="text-nowrap"><i class="icon ion-upload"></i> Lagring (TB)</th>
		                            <th class="text-nowrap"><i class="icon ion-cash"></i> Kostnad (kr)</th>
		                            <th class="text-nowrap"><i class="icon ion-key"></i> Status</th>
	                            </tr>
	                        </tfoot>
	                    </table>
					</div><!-- /.box-body -->
					<div class="box-footer">
						<div class="input-group-btn">
							<button type="button" class="btn bg-aqua dropdown-toggle icon ion-ios-email" data-toggle="dropdown"> E-post eksport <span class="fa fa-caret-down"></span></button>
							<ul class="dropdown-menu">
								<li><a href="#" class="email_export icon ion-android-people" data-export-group="kontaktpersoner" data-toggle="modal" data-target="#emailExportModal"> Kontakter</a></li>
								<li class="divider"></li>
								<li><a href="#" class="email_export icon ion-help-buoy" data-export-group="supportpunkt" data-toggle="modal" data-target="#emailExportModal"> Supportpunkt</a></li>
							</ul>
						</div>
					</div>

					      <!-- EMAIL EXPORT MODAL -->
					<div class="modal fade" id="emailExportModal" tabindex="-1" role="dialog" aria-labelledby="modalExportTitle" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header bg-dark-gray">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;&nbsp;&nbsp;<span aria-hidden="true">&times;</span></button>
									<h4 class="modal-title" id="modalExportTitle">
										E-post eksport for <strong id="emailExportTargetGroup"><!--JS--></strong>
										<span id="emailExportCount" class="badge bg-green pull-right" title="Antall adresser i liste"><!--JS--></span>
									</h4>
								</div>
								<div class="modal-body">
									<p>Kopier og lim inn i <code>To:</code> / <code>Cc:</code> / <code>BCc:</code> feltet i e-post:</p>
									<textarea id="emailExportList" style="width: 100%;" rows="10" onclick="$(this).select();"><!--JS--></textarea>
									<div id="emailMissing" class="text-muted"><!--JS--></div>
								</div>
								<div class="modal-footer bg-dark-gray">
									<button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
								</div>
							</div>
						</div>
					</div>
					      <!-- //.modal -->

					<div class="overlay ajax">
						<i class="fa ion-load-d fa-spin"></i>
					</div>
				</div><!-- /.box -->
		    </div> <!-- /.col -->
	    </div><!-- /.row -->

	    <h2 class="page-header">Lagring &amp; Fakturering</h2>

		<div class="row">
			<div class="col-md-8">
				<div class="box box-success">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-ios-pie"> Fordeling i TB</i></h3>
					</div>
					<div class="box-body">
						<canvas id="pieOrgsDiskusageSuper" style="cursor: pointer;">
							<!--_buildPieOrgsDiskusageSuper-->
							<div class="overlay ajax">
								<i class="fa ion-load-d fa-spin"></i>
							</div>
						</canvas>
					</div><!-- /.box-body -->
					<div class="box-footer text-muted">
						Klikk på paien for å oppdatere detaljvisning nedenfor :)
					</div>
				</div><!-- /.box -->
			</div><!-- /.col -->

			<div class="col-md-4">
				<div class="box box-success">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-arrow-graph-down-right"> Kostnadsestimator</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>

					<div class="box-body">
						<p>
							Estimatoren er i utgangspunktet hardkodet med en pris per TB p&aring;
							<span class="defaultStorageCostPerTB"><!--updateUserUI()--></span>.
							Du kan endre dette i feltet under og klikke p&aring; kalkulatoren.
						</p>
						<p>
							Alle fakturaestimater i tjenesten oppdateres iht. kostnaden du setter her. Estimatene er regnet ut med snitt-lagring,
							ikke diskforbruk fra siste lesing.
						</p>

						<div class="input-group input-group-sm" style="margin-bottom: 10px;">
	                        <input class="inputCostTB form-control pull-right" type="text" placeholder="Pris per TB" value="" style="width: 100px;">
	                        <span class="input-group-btn">
	                            <button id="btnInvoiceCalc" class="btn btn-info btn-sm btn-flat ion ion-calculator" type="button">&nbsp;</button>
	                        </span>
                        </div>
					</div><!-- /.box-body -->

					<div class="box-footer">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-xs-6">
								<div class="description-block border-right">
									<h5 class="description-header storageCostPerTB"><!-- --></h5>
									<span class="description-text">PER TB</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
							<div class="col-md-6 col-sm-6 col-xs-6">
								<div class="description-block border-right">
									<h5 class="description-header totalAvgStorageCostEstimate"><!-- --></h5>
									<span class="description-text">ESTIMAT</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
						</div><!-- /.row -->
					</div>
				</div><!-- /.box -->
			</div><!-- /.col  -->
		</div><!-- /.row -->

		<h2 id="org_details" class="page-header">Detaljvisning</h2>

		<div class="row">
			<div class="col-md-12">
				<div class="box box-info">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-arrow-graph-up-right"> Viser oversikt for <code class="selectedOrg"></code></h3>
						<div class="box-tools pull-right">
							<div class="btn-group">
								<button class="btn btn-box-tool btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="ion ion-university"></i> VELG ORG</button>
								<ul id="orgListSuperAdmin" class="dropdown-menu" role="menu">
									<!-- OrgList -->
								</ul>
							</div>
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<div class="info-box">
							<span class="info-box-icon bg-aqua"><i class="ion ion-arrow-graph-up-right"></i></span>
							<div class="info-box-content">
								<p>
									Grafen viser <code class="selectedOrgRecordedDatesNum"><!-- --></code> dager med diskforbruk (i GB),
									<u>der variasjon i forbruk fra forrige lesing er større enn <span class="minDiffStorageThreshold"><!-- --></span>MB</u>.
								</p>

								<p class="text-muted">
									Følg derfor med på dato når du leser grafen.
								</p>

								<p>
									Velg org i tittellinja over eller ved &aring; klikke p&aring; pai-grafen. Sistnevnte tar med ALLE mapper p&aring; filserver, ogs&aring; mapper som ikke
									tilh&oslash;rer en abonnent/org.
								</p>
							</div><!-- /.info-box-content -->
						</div>

						<div class="chart">
							<canvas id="orgUsageLineChartSuperAdmin" style="min-height: 300px;">
								<!-- Line Chart -->
							</canvas>
							<span class="text-muted">Klikk for &aring; endre farge, høyreklikk for å lagre som bildefil (png).</span>
						</div>


					</div><!-- /.box-body -->

					<div class="box-footer">
						<div class="row">
							<div class="col-sm-3 col-xs-6">
								<div class="description-block border-right">
									<span class="description-percentage text-green orgSubscriptionStatus">&nbsp;</span>
									<h5 class="description-header">&nbsp;</h5>
									<span class="description-text">KIND</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
							<div class="col-sm-3 col-xs-6">
								<div class="description-block border-right">
									<span class="description-percentage text-green"><i class="fa fa-pie-chart"></i> <span class="orgStoragePercentageGlobal"><!-- --></span>%</span>
									<h5 class="description-header orgTotalStorage"><!-- --></h5>
									<span class="description-text">TOTALT</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
							<div class="col-sm-3 col-xs-6">
								<div class="description-block border-right">
									<span class="orgTotalStoragePercentageOfOrgAvg"><!-- --></span>
									<h5 class="description-header orgAvgStorageThisYear"><!-- --></h5>
									<span class="description-text">SNITT I &Aring;R</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
							<div class="col-sm-3 col-xs-6">
								<div class="description-block">
									<span class="description-percentage text-muted"><i class="fa fa-calendar-o"></i> Per i dag</span>
									<h5 class="description-header orgInvoiceEstimateThisYear"><!-- --></h5>
									<span class="description-text">ESTIMAT</span>
								</div><!-- /.description-block -->
							</div>
						</div><!-- /.row -->
					</div>
				</div><!-- /.box -->
			</div><!-- /.col -->
		</div><!-- /.row -->

		<h2 class="page-header">Til info...</h2>
		<div class="row">
			<div class="col-md-12">
				<div class="box box-warning">
					<div class="box-body">
						<p>Organisasjonsnavn og Mediasite foldernavn er ikke alltid i samsvar med hverandre.</p>
						<p>Nedenfor vises hvilke mappinger som er hardkodet inn i denne klienten for at en orgs folder (p&aring; h&oslash;yre side) skal bli funnet.</p>
					    <pre id="orgToFolderMap" class="well"></pre>
					</div>
				</div><!-- /.box -->
			</div><!-- /.col -->
		</div><!-- /.row -->



    </section><!-- /.content -->


	    <!-- SUBSCRIPTION INFO MODAL -->
		<div id="subscriptionStatusInfoModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalSubscriptionInfoTitle" aria-hidden="true">
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

<!-- Scripts pertaining only to SuperAdmin -->
<script src="app/js/page_super_admin.js" type="text/javascript"></script>