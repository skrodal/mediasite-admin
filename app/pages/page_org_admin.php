<!-- Main content -->
    <section id="pageOrgAdmin" class="content app_page hidden">
		<div class="jumbotron clearfix">
			<div class="container">
				<h1 class="icon ion-ios-home text-nowrap"> <strong>Org</strong>Admin</h1>
				<p class="text-muted">Infoside for <span class="feideOrg"><!-- AJAX --></span>.</p>
			</div>

			<div class="pull-right">
				<h2 class="text-muted"><span class="userFullName"><!--updateUserUI--></span></h2>
				<span class="label bg-orange icon ion-ios-home feideOrg"><!--updateUserUI--></span>
				<span class="label bg-orange feideAffiliation icon ion-university"><!--updateUserUI--></span>
				<span class="label bg-orange userRole icon ion-ios-star"><!--updateUserUI--></span>
			</div>
		</div>

		<h2 class="page-header">Oversikt</h2>

		<div class="row">
			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-aqua"><i class="ion ion-ios-pie"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">BRUK</span>
						<span class="info-box-number orgStoragePercentageGlobal"><!-- --></span>
						<div class="progress bg-aqua"></div>
						<span class="progress-description text-muted">Andel av total</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->

			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-red"><i class="ion ion-upload"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">LAGRING</span>
						<span class="info-box-number orgTotalStorage"><!-- --></span>
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
						<span class="info-box-number orgAvgStorageThisYear"><!-- --></span>
						<div class="progress bg-yellow"></div>
						<span class="progress-description text-muted">For dette &aring;r</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->

			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-green"><i class="fa fa-money"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">KOST</span>
						<span class="info-box-number description-header orgAvgStorageCostEstimate"><!-- --></span>
						<div class="progress bg-green"></div>
						<span class="progress-description text-muted">Estimat</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->
		</div>



		<h2 class="page-header">Lagring &amp; Fakturering</h2>

		<div class="row">
			<div class="col-md-8">
				<div class="box box-success">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-arrow-graph-up-right"> Forbruk lagring (i GB)</h3>
						<div class="box-tools pull-right">
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<p>
							Viser siste <code class="orgRecordedDatesNum"></code> dager med endringer i diskforbruk.
						</p>
						<div class="chart">
							<canvas id="orgUsageLineChartOrgAdmin" style="min-height: 300px;">
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
									<span class="description-text">STATUS</span>
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
									<span class="description-percentage text-gray"><i class="fa fa-calendar-o"></i> Per i dag</span>
									<h5 class="description-header orgInvoiceEstimateThisYear"><!-- --></h5>
									<span class="description-text">ESTIMAT</span>
								</div><!-- /.description-block -->
							</div>
						</div><!-- /.row -->
					</div>

				</div><!-- /.box -->
			</div>


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
							<em>kr. <span class="storageCostPerTB"><!--updateUserUI()--></span></em>.
							Du kan endre dette i feltet under og klikke p&aring; kalkulatoren.
						</p>
						<p>
							Alle fakturaestimater p&aring; denne siden oppdateres iht. kostnaden du setter. Estimatene er regnet ut med snitt-lagring,
							ikke diskforbruk fra siste lesing.
						</p>

						<div class="input-group input-group-sm" style="margin-bottom: 10px;">
	                        <input id="inputCostTB" type="text" placeholder="Pris per TB" value="" class="form-control pull-right" style="width: 100px;">
	                        <span class="input-group-btn">
	                            <button id="btnInvoiceCalc" class="btn btn-info btn-sm btn-flat ion ion-calculator" type="button">&nbsp;</button>
	                        </span>
                        </div>
					</div><!-- /.box-body -->

					<div class="box-footer">
						<div class="row">
									<div class="col-md-6 col-sm-6 col-xs-6">
										<div class="description-block border-right">
											<h5 class="description-header costPerTB"><!-- --></h5>
											<span class="description-text">PER TB</span>
										</div><!-- /.description-block -->
									</div><!-- /.col -->
									<div class="col-md-6 col-sm-6 col-xs-6">
										<div class="description-block border-right">
											<h5 class="description-header orgAvgStorageCostEstimate"><!-- --></h5>
											<span class="description-text">ESTIMAT</span>
										</div><!-- /.description-block -->
									</div><!-- /.col -->
								</div><!-- /.row -->
					</div>
				</div><!-- /.box -->
			</div><!-- /.col  -->
		</div>

		<h2 class="page-header">My Mediasite</h2>

		<div class="row">
		    <div class="col-lg-12">
			    <div class="alert alert-warning">
				    Fungerer, men sl&aring;tt av siden dette krever API bruker/passord per org som bruker tjenesten. Trenger ogs&aring; &aring; avklare hvilken
				    merverdi denne lista gir (eks. epostliste for alle My Mediasite brukere).
			    </div>
				<!-- My Mediasite TABLE -->
				<div id="myMediasiteUsersTableBoxOrgAdmin" class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-ios-people"> My Mediasite Brukerliste</h3>
						<div class="box-tools pull-right">
							<span class="badge bg-blue my_mediasite_users_count"><!--????????????--></span>
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<p>
							Brukere med egen profil og eksisterende brukermappe i
							<code class="text-muted">
								<span class="label bg-yellow ion ion-folder"> </span> Mediasite Users
							</code>
						</p>
						<hr/>
						<table id="myMediasiteUsersTableOrgAdmin" class="table table-bordered table-striped table-hover" style="width: 100%;">
	                        <thead class="text-muted">
	                            <tr>
	                                <th><i class="icon ion-android-person"></i> Navn</th>
		                            <th><i class="icon ion-ios-email"></i> Epost</th>
	                                <th><!-- Info button, not sortable, no column title --></th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <!-- AJAX/DataTables -->
	                        </tbody>
	                        <tfoot class="text-muted">
	                            <tr>
	                                <th><i class="icon ion-android-person"></i> Navn</th>
		                            <th><i class="icon ion-ios-email"></i> Epost</th>
	                                <th><!-- Info button, not sortable, no column title --></th>
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
					<div class="overlay ajax">
						<i class="fa ion-load-d fa-spin"></i>
					</div>
				</div><!-- /.box -->
		    </div>
	    </div>

	    <h2 class="page-header">Informasjon om <span class="feideOrg"></span></h2>

	    <div class="row">
			<div class="col-lg-5">
				<div class="box box-info">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-ios-contact"> Registrerte detaljer</h3>
						<div class="box-tools pull-right">
							<span class="subscriptionStatus"><!-- --></span>
							<button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
						</div>
					</div>
					<div class="box-body">
						<dl>
							<dt>Kontaktperson:</dt>
							<dd class="serviceContact"><!--updateOrgAdminUI()--></dd>
							<dt>Supportpunkt</dt>
							<dd class="serviceSupport"><!--updateOrgAdminUI()--></dd>
							<dt>Tjeneste URL:</dt>
							<dd class="serviceUrl"><!--updateOrgAdminUI()--></dd>
						</dl>
					</div>
					<div class="box-footer text-muted">
						<small>
							<i class="icon ion-ios-information"></i> Hentet fra UNINETTs driftsdatabase ('KIND'). <br>
							&Oslash;nsker om endringer av informasjon sendes til <a href="mailto:support@ecampus.no">support@ecampus.no</a>
						</small>
					</div>
				</div>
			</div>
	    </div>
    </section><!-- /.content -->


<!-- EMAIL EXPORT MODAL -->
					<div class="modal fade" id="emailExportModal" tabindex="-1" role="dialog" aria-labelledby="modalExportTitle" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;&nbsp;&nbsp;<span aria-hidden="true">&times;</span></button>
									<h4 class="modal-title" id="modalExportTitle">
										E-post eksport for <mark id="emailExportTargetGroup"><!--JS--></mark>
										<span id="emailExportCount" class="badge bg-green pull-right" title="Antall adresser i liste"><!--JS--></span>
									</h4>
								</div>
								<div class="modal-body">
									<p>Kopier og lim inn i <code>To:</code> / <code>Cc:</code> / <code>BCc:</code> feltet i e-post:</p>
									<textarea id="emailExportList" style="width: 100%;" rows="10" onclick="$(this).select();"><!--JS--></textarea>
									<div id="emailMissing" class="text-muted"><!--JS--></div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
								</div>
							</div>
						</div>
					</div>
<!-- //.modal -->

<!-- USER DETAILS MODAL -->
					<div class="modal fade" id="userDetailsModal" tabindex="-1" role="dialog" aria-labelledby="modalUserDetailsTitle" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;&nbsp;&nbsp;<span aria-hidden="true">&times;</span></button>
									<h4 class="modal-title">
										Detaljer for <mark id="userName"><!--JS--></mark>
										<span id="userPresentationCount" class="badge bg-green pull-right" title="Antall presentasjoner"><!--JS--></span>
									</h4>
								</div>

								<div class="modal-body">
									<p>Kopier og lim inn i <code>To:</code> / <code>Cc:</code> / <code>BCc:</code> feltet i e-post:</p>
								</div>

								<div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
								</div>
							</div>
						</div>
					</div>
<!-- //.modal -->

<script src="app/js/page_org_admin.js" type="text/javascript"></script>
