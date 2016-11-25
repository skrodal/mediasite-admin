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
						<span class="info-box-text">ORGS</span>
						<span class="info-box-number orgCount"><!-- --><i class="fa fa-spinner fa-pulse"></i></span>
						<div class="progress bg-aqua"></div>
						<span class="progress-description text-muted">På disk</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->

			<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-red"><i class="ion ion-upload"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">LAGRING</span>
						<span class="info-box-number subscribersDiskusageTotal"><!-- --><i class="fa fa-spinner fa-pulse"></i></span>
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
						<span class="info-box-number subscribersDiskusageAvgThisYear"><!-- --><i class="fa fa-spinner fa-pulse"></i></span>
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
						<span class="info-box-number description-header totalAvgStorageCostEstimate"><!-- --><i class="fa fa-spinner fa-pulse"></i></span>
						<div class="progress bg-green"></div>
						<span class="progress-description text-muted">Estimat</span>
					</div><!-- /.info-box-content -->
				</div><!-- /.info-box -->
			</div><!-- /.col -->
		</div>

		<h2 class="page-header">Organisasjoner</h2>

	    <div class="row">
		    <div class="col-lg-12">
				<!-- SUBSCRIBERS TABLE -->
				<div id="subscribersTableBoxSuperAdmin" class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title icon ion-ios-home"> Orgmapper på disk</h3>
					</div>
					<div class="box-body table-responsive">

						<div class="info-box">
							<span class="info-box-icon bg-blue-active"><i class="ion ion-ios-home"></i></span>
							<div class="info-box-content">
								<ul>
									<li><span class="orgCount"></span> orgmapper funnet på filserver.</li>
									<li>Lagring/kostnad er basert på snittverdier for <?php echo date("Y"); ?> <span class="text-muted">(lagring * pris per TB)</span>.</li>

								</ul>
							</div><!-- /.info-box-content -->
						</div>

						<table id="subscribersTableSuperAdmin" class="table table-bordered table-striped table-hover" style="width: 100%; font-size: 13px;">
	                        <thead class="text-muted">
	                            <tr>
	                                <th class="text-nowrap"><i class="icon ion-android-home"></i> Org</th>
	                                <th class="text-nowrap"><i class="icon ion-upload"></i> Lagring (TB)</th>
	                                <th class="text-nowrap"><i class="icon ion-cash"></i> Kostnad (kr)</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <!-- AJAX/DataTables -->
	                        </tbody>
	                        <tfoot class="text-muted">
	                            <tr>
	                                <th class="text-nowrap"><i class="icon ion-android-home"></i> Org</th>
		                            <th class="text-nowrap"><i class="icon ion-upload"></i> Lagring (TB)</th>
		                            <th class="text-nowrap"><i class="icon ion-cash"></i> Kostnad (kr)</th>
	                            </tr>
	                        </tfoot>
	                    </table>
					</div><!-- /.box-body -->
					<div class="box-footer">
						<p>Organisasjonsnavn og Mediasite foldernavn er ikke alltid i samsvar med hverandre.</p>
						<p>Nedenfor vises hvilke mappinger som er hardkodet inn i denne klienten (orgnavn : foldernavn).</p>
					    <pre id="orgToFolderMap" class="well"></pre>
					</div>

					<div class="overlay ajax">
						<i class="fa ion-load-d fa-spin"></i>
					</div>
				</div><!-- /.box -->
		    </div> <!-- /.col -->
	    </div><!-- /.row -->

	    <h2 class="page-header">Lagring & Fakturering</h2>

		<div class="row">
			<div class="col-lg-8 col-md-8">
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

			<div class="col-lg-4 col-md-4">
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
			<div class="col-lg-8 col-md-8">
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
							<div class="col-sm-4 col-xs-4">
								<div class="description-block border-right">
									<span class="description-percentage text-green"><i class="fa fa-pie-chart"></i> <span class="orgStoragePercentageGlobal"><!-- --></span>%</span>
									<h5 class="description-header orgTotalStorage"><!-- --></h5>
									<span class="description-text">TOTALT</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
							<div class="col-sm-4 col-xs-4">
								<div class="description-block border-right">
									<span class="orgTotalStoragePercentageOfOrgAvg"><!-- --></span>
									<h5 class="description-header orgAvgStorageThisYear"><!-- --></h5>
									<span class="description-text">SNITT I &Aring;R</span>
								</div><!-- /.description-block -->
							</div><!-- /.col -->
							<div class="col-sm-4 col-xs-4">
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
    </section><!-- /.content -->


<!-- Scripts pertaining only to SuperAdmin -->
<script src="app/js/page_super_admin.js" type="text/javascript"></script>